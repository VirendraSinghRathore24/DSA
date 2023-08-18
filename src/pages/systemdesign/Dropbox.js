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
                <br/>
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
                <br/>
                1. Highly Available
                <br/>
                2. Data should not lost
                <br/><br/>
                <strong>Design Consideration:</strong>
                <br/>
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

                <strong>High Level Diagram:</strong>
                <br/>
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
                <p>
                    <strong>A. Client: </strong>
                    <br/>
                    Here are some of the essential operations for the client:
                    <br/>
1. Upload and download files.
<br/>
2. Detect file changes in the workspace folder.
<br/>
3. Handle conflict due to offline or concurrent updates.
                </p>
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
                <br/><br/>

                <strong>DB Choice:</strong>
                <p>

                </p>
            </p>
        </div>
    </div>
  )
}

export default Dropbox