import React from 'react'
import { NavLink } from 'react-router-dom'

function Dropbox() {
  return (
    <div >
        <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink><NavLink to="/System-Design"> / System Design  </NavLink></strong>  / Dropbox</p>
        <div className='flex flex-wrap w-full items-center justify-center font-semibold text-xl'>Dropbox / Google Drive / One Drive / Cloud Storage</div>
        <div>
            <p className='p-10'>
                <strong>Requirements: </strong>
                <br/><br/>
                1. Users should be able to upload and download their files/photos from any device.
                <br/>
                2. Users should be able to share files or folders with other users.
                <br/>
                3. Our service should support automatic synchronization between devices, i.e., after updating a file on one device, it should get synchronized on all devices.
                <br/>
                4. Our system should support offline editing. Users should be able to add/delete/modify files while offline, and as soon as they come online, all their changes should be synced to the remote servers and other online devices.
                <br/>
                5. ACID-ity is required. Atomicity, Consistency, Isolation and Durability of all file operations should be guaranteed.
                <br/>
                <br/>
                <strong>Non Functional Requirements:</strong>
                <br/><br/>
                1. Highly Available
                <br/>
                2. Data should not lost
                <br/><br/>
                <strong>Design Consideration:</strong>
                <br/><br/>
                We should expect huge read and write volumes.
                <br/>
                Read to write ratio is expected to be nearly the same.
                <br/>
                Internally, files can be stored in small parts or chunks (say 4MB); this can
provide a lot of benefits i.e. all failed operations shall only be retried for smaller parts of a file. If a user fails to upload a file, then only the failing chunk will be retried.
                <br/>
                By removing duplicate chunks, we can save storage space and bandwidth usage.
                <br/>
                Keeping a local copy of the metadata (file name, size, etc.) with the client can save us a lot of round trips to the server.

                <br/><br/>
                <strong>Capacity Estimation:</strong>
                <br/><br/>
                <strong>High Level Diagram:</strong>
                <br/><br/>
                The user will specify a folder as the workspace on their device. Any file/photo/folder placed in this folder will be uploaded to the cloud, and whenever a file is modified or
deleted, it will be reflected in the same way in the cloud storage. The user can specify similar workspaces on all their devices and any modification done on one device will be propagated to all other devices to have the same view of the workspace everywhere.
<br/><br/>
At a high level, we need to store files and their metadata information like File Name, File Size, Directory, etc., and who this file is shared with. So, we need some servers that can help the clients to upload/download files to Cloud Storage and some servers that can facilitate updating metadata about files and users. We also need some
50
mechanism to notify all clients whenever an update happens so they can synchronize their files.
<br/><br/>
Block servers will work with the clients to upload/download files from cloud storage.
<br/>
Metadata servers will keep metadata of files updated in a SQL or NoSQL database.
<br/>
Synchronization servers will handle the workflow of notifying all clients about different changes for synchronization.
<br/><br/>
<img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1692357372/Screenshot_2023-08-18_at_4.43.22_PM_tgqdku.png" className='w-[600px] h-[300px]'></img>
                <br/><br/>

                <strong>Components Discussion:</strong>
                <br/>
                    <strong>A. Client: </strong>
                    <br/>
                    Here are some of the essential operations for the client:
                    <br/>
1. Upload and download files.
<br/>
2. Detect file changes in the workspace folder.
<br/>
3. Handle conflict due to offline or concurrent updates.
                
                <br/><br/>
                <strong>How do we handle file transfer efficiently?</strong>
                <br/>
                We can break each file into smaller chunks so that we transfer only those chunks that are modified and not the whole file. Let’s say we divide each file into fixed sizes of 4MB chunks. We can statically calculate what could be an optimal chunk size based on 1) Storage devices we use in the cloud to optimize space utilization and input/output operations per second (IOPS) 2) Network bandwidth 3) Average file size in the storage etc. In our metadata, we should also keep a record of each file and the chunks that constitute it.
                <br/><br/>
                <strong>Should we keep a copy of metadata with Client?</strong>
                <br/>
                Keeping a local copy of metadata not only enable us to do offline updates but also saves a lot of round trips to update remote metadata.
                <br/><br/>
                <strong>How can clients efficiently listen to changes happening with other clients?</strong>
                <br/>
                One solution could be that the clients periodically check with the server if there are any changes. The problem with this approach is that we will have a delay in reflecting changes locally as clients will be checking for changes periodically compared to a server notifying whenever there is some change. If the client frequently checks the server for changes, it will not only be wasting bandwidth, as the server has to return an empty response most of the time, but will also be keeping the server busy. Pulling information in this manner is not scalable.
                <br/><br/>
                A solution to the above problem could be to use HTTP long polling. With long polling the client requests information from the server with the expectation that the server may not respond immediately. If the server has no new data for the client when the poll is received, instead of sending an empty response, the server holds the request open and waits for response information to become available. Once it does have new information, the server immediately sends an HTTP/S response to the client, completing the open HTTP/S Request. Upon receipt of the server response, the client can immediately issue another server request for future updates.
                <br/><br/>
                <strong>We can divide our client into following four parts:</strong>
                <br/><br/>
                <strong>I. Internal Metadata Database </strong> will keep track of all the files, chunks, their versions, and their location in the file system.
                <br/><br/>
                <strong>II. Chunker </strong> will split the files into smaller pieces called chunks. It will also be responsible for reconstructing a file from its chunks. Our chunking algorithm will detect the parts of the files that have been modified by the user and only transfer
those parts to the Cloud Storage; this will save us bandwidth and synchronization time.
                <br/><br/>
                <strong>III. Watcher </strong>will monitor the local workspace folders and notify the Indexer (discussed below) of any action performed by the users, e.g. when users create, delete, or update files or folders. Watcher also listens to any changes happening on other clients that are broadcasted by Synchronization service.
                <br/><br/>
                <strong>IV. Indexer </strong>will process the events received from the Watcher and update the internal metadata database with information about the chunks of the modified files. Once the chunks are successfully submitted/downloaded to the Cloud Storage, the Indexer will communicate with the remote Synchronization Service to broadcast
changes to other clients and update remote metadata database.
<br/><br/>
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1692359001/Screenshot_2023-08-18_at_5.13.00_PM_khfm56.png' className='w-[600px] h-[300px]'></img>

                <br/><br/>

                <strong>B. Metadata DB:</strong>
                <br/><br/>
                The Metadata Database is responsible for maintaining the versioning and metadata information about files/chunks, users, and workspaces. The Metadata Database can be a relational database such as MySQL, or a NoSQL database service such as DynamoDB. Regardless of the type of the database, the Synchronization Service
should be able to provide a consistent view of the files using a database, especially if more than one user is working with the same file simultaneously. Since NoSQL data stores do not support ACID properties in favor of scalability and performance, we need to incorporate the support for ACID properties programmatically in the logic of our Synchronization Service in case we opt for this kind of database. However, using a relational database can simplify the implementation of the Synchronization Service as they natively support ACID properties.
                <br/><br/>
                The Metadata Database should be storing information about following objects:
                <br/>
                <strong>1. Chunks</strong>
                <br/>
                <strong>2. Files</strong>
                <br/>
                <strong>3. User</strong>
                <br/>
                <strong>4. Devices</strong>
                <br/>
                <strong>5. Workspace (sync folders)</strong>
                <br/>

                <br/><br/>
                <strong>C. Synchronization Service:</strong>
                <br/><br/>
                The Synchronization Service is the component that processes file updates made by a client and applies these changes to other subscribed clients. It also synchronizes clients’ local databases with the information stored in the remote Metadata DB. 
                <br/><br/>
                Desktop clients communicate with the Synchronization Service to either obtain updates from the Cloud Storage or send files and updates to the Cloud Storage and, potentially, other users.
                <br/><br/>
                If a client was offline for a period, it polls the system for new updates as soon as they come online. When the Synchronization Service receives an update request, it checks with the Metadata Database for consistency and then proceeds with the update. Subsequently, a notification is sent to all subscribed users or devices to report the file update.
                <br/><br/>
                To be able to provide an efficient and scalable synchronization protocol we can consider using a communication middleware between clients and the Synchronization Service. The messaging middleware should provide scalable message queuing and change notifications to support a high number of clients using pull or push strategies. This way, multiple Synchronization Service instances can receive requests from a global request Queue, and the communication middleware will be able to balance its load.
                <br/><br/>
                <strong>D. Message Queuing Service:</strong>
                <br/><br/>
                An important part of our architecture is a messaging middleware that should be able to handle a substantial number of requests. A scalable Message Queuing Service that supports asynchronous message-based communication between clients and the Synchronization Service best fits the requirements of our application. The Message Queuing Service supports asynchronous and loosely coupled message-based communication between distributed components of the system. The Message Queuing Service should be able to efficiently store any number of messages in a highly available, reliable and scalable queue.
                <br/><br/>
                The Message Queuing Service will implement two types of queues in our system.
                <br/>
                <strong>Request Queue - </strong>is a global queue and all clients will share it. Clients’ requests to update the Metadata Database will be sent to the Request Queue first, from there the Synchronization Service will take it to update metadata.
                <br/>
                <strong>Response Queues - </strong>that correspond to individual subscribed clients are responsible for delivering the update messages to each client. Since a message will be deleted from the queue once received by a client, we need to create separate Response Queues for each subscribed client to share update messages.
                <br/><br/>
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1692359862/Screenshot_2023-08-18_at_5.27.12_PM_lqsy9o.png' className='w-[600px] h-[300px]'></img>
                <br/><br/>
                <strong>E. Cloud/Block Storage:</strong>
                <br/><br/>
                Cloud/Block Storage stores chunks of files uploaded by the users. Clients directly interact with the storage to send and receive objects from it. Separation of the metadata from storage enables us to use any storage either in the cloud or in-house.
                <br/><br/>
                <img src='https://res.cloudinary.com/dixqxdivr/image/upload/v1692360062/Screenshot_2023-08-18_at_5.30.40_PM_pu5fwg.png' className='w-[600px] h-[300px]'></img>
                <br/><br/>
                <strong>File Processing Workflow:</strong>
                <br/><br/>
                Client A updates a file that is shared with Client B and C, so they should receive the update too. If the other clients are not online at the time of the update, the Message Queuing Service keeps the update notifications in separate response queues for them until they come online later.
                <br/><br/>
                1. Client A uploads chunks to cloud storage.
                <br/>
                2. Client A updates metadata and commits changes.
                <br/>
                3. Client A gets confirmation and notifications are sent to Clients B and C about the changes.
                <br/>
                4. Client B and C receive metadata changes and download updated chunks.
                <br/><br/>
                <strong>Data Deduplication:</strong>
                <br/><br/>
                Data deduplication is a technique used for eliminating duplicate copies of data to improve storage utilization. It can also be applied to network data transfers to reduce the number of bytes that must be sent. For each new incoming chunk, we can
                calculate a hash of it and compare that hash with all the hashes of the existing chunks to see if we already have the same chunk present in our storage.
                <br/><br/>
                We can implement deduplication in two ways in our system:
                <br/>
                <br/>
                <strong>A. Post-process deduplication:</strong>
                <br/>
                With post-process deduplication, new chunks are first stored on the storage device and later some process analyzes the data looking for duplication. The benefit is that clients will not need to wait for the hash calculation or lookup to complete before storing the data, thereby ensuring that there is no degradation in storage performance.
                <br/><br/>
                Drawbacks of this approach are:
                <br/>
                We will unnecessarily be storing duplicate data, though for a short time.
                <br/>
                Duplicate data will be transferred consuming bandwidth.
                <br/><br/>
                <strong>B. In-line deduplication:</strong>
                <br/>
                In-line deduplication hash calculations can be done in real-time as the clients are entering data on their device. If our system identifies a chunk that it has already stored, only a reference to the existing chunk will be added in the metadata, rather than a full copy of the chunk. This approach will give us optimal network and storage usage.
                <br/><br/>
                <strong>Metadata Partitioning:</strong>
                <br/><br/>
                To scale out metadata DB, we need to partition it so that it can store information about millions of users and billions of files/chunks. We need to come up with a partitioning scheme that would divide and store our data in different DB servers.
                <br/><br/>
                <strong>1. Vertical Partitioning: </strong> We can partition our database in such a way that we store tables related to one particular feature on one server. For example, we can store all the user related tables in one database and all files/chunks related tables in another database. Although this approach is straightforward to implement it has some issues:
                <br/>
                Once we start getting more and more data then it will not be able to scale.
                <br/>
                Joining two tables in two separate databases can cause performance and consistency issues
                <br/><br/>
                <strong>2. Range Based Partitioning: </strong>we store files/chunks in separate partitions based on the first letter of the File Path? In that case, we save all the files starting with the letter ‘A’ in one partition and those that start with the letter ‘B’ into another
                partition and so on.
                <br/>
                The main problem with this approach is that it can lead to unbalanced servers. For example, if we decide to put all files starting with the letter ‘E’ into a DB partition, and later we realize that we have too many files that start with the letter ‘E’, to such an extent that we cannot fit them into one DB partition.
                <br/><br/>
                <strong>3. Hash-Based Partitioning: </strong>In this scheme we take a hash of the object we are storing and based on this hash we figure out the DB partition to which this object should go. In our case, we can take the hash of the ‘FileID’ of the File object we are
storing to determine the partition the file will be stored. Our hashing function will randomly distribute objects into different partitions, e.g., our hashing function can always map any ID to a number between [1...256], and this number would be the partition we will store our object.
                <br/>
                This approach can still lead to overloaded partitions, which can be solved by using Consistent Hashing.
                <br/><br/>
                <strong>Note : We can use cache and load balancers and also add permissions to the files</strong>

            </p>
        </div>
    </div>
  )
}

export default Dropbox