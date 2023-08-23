import React from 'react'
import { NavLink } from 'react-router-dom'

function YouTube() {
  return (
    <div >
        <p className='p-2 text-[16px]'><strong className='font-semibold '><NavLink to="/"> Home </NavLink><NavLink to="/System-Design"> / System Design  </NavLink><NavLink to="/System-Design-Apps"> / System Design Apps </NavLink></strong>  / YouTube</p>
        <div className='flex flex-wrap w-full items-center justify-center font-semibold text-xl p-2'>YouTube / Netflix</div>
        <div>
            <p className='p-10'>
                <strong>Requirements: </strong>
                <br/><br/>
                1. User should be able to upload videos
                <br/>
                2. User should be able to view videos
                <br/>
                3. User should be able to search videos based on title
                <br/>
                4. User should be able to like and comment on videos
                <br/><br/>
                <strong>Non Functional Requirements: </strong>
                <br/>
                <br/>
                1. Highly Available
                <br/>
                2. Highly Reliable - Uploaded video should not lost
                <br/>
                3. Evantual Consistency
                <br/>
                <br/>

                <strong>Capacity Estimation:</strong>
                <br/><br/>

                <strong>High Level Diagram:</strong>
                <br/><br/>
                At a high-level we would need the following components:
                <br/>
                <strong>1. Processing Queue: </strong>Each uploaded video will be pushed to a processing
queue to be de-queued later for encoding, thumbnail generation, and storage.
                <br/><br/>
                <strong>2. Encoder: </strong>To encode each uploaded video into multiple formats.
                <br/><br/>
                <strong>3. Thumbnails generator: </strong>To generate a few thumbnails for each video.
                <br/><br/>
                <strong>4. Video and Thumbnail storage: </strong>To store video and thumbnail files in some
distributed file storage.
                <br/><br/>
                <strong>5. User Database: </strong> To store user’s information, e.g., name, email, address, etc.
                <br/><br/>
                <strong>6. Video metadata storage: </strong> A metadata database to store all the information
about videos like title, file path in the system, uploading user, total views, likes, dislikes, etc. It will also be used to store all the video comments.
                <br/><br/>
                <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1692429011/Screenshot_2023-08-19_at_12.39.51_PM_bxhmre.png" loading='lazy' className='w-[700px] h-[300px]'></img>
                <br/><br/>
                <strong>Components Discussion:</strong>
                <br/>
                <br/>
                The service would be read-heavy, so we will focus on building a system that can retrieve videos quickly. We can expect our read:write ratio to be 200:1, which means for every video upload there are 200 video views.
                <br/>
                We can store videos in HDFS
                <br/><br/>
                We should segregate our read traffic from write traffic. Since we will have multiple copies of each video, we can
distribute our read traffic on different servers.
<br/><br/>
For metadata, we can have master- slave configurations where writes will go to master first and then gets applied at all the slaves. Such configurations can cause some staleness in data, e.g., when a new video is added, its metadata would be inserted in the master first and before it gets applied at the slave our slaves would not be able to see it; and therefore it will be returning stale results to the user. This staleness might be acceptable in our system as it would be very short-lived and the user would be able to see the new videos after a few milliseconds.
                <br/><br/>


                <strong>Thumbnail Storage:</strong>
                <br/><br/>
                There will be a lot more thumbnails than videos. If we assume that every video will have five thumbnails, we need to have a very efficient storage system that can serve a huge read traffic. There will be two consideration before deciding which storage system should be used for thumbnails:
                <br/><br/>
                1. Thumbnails are small files with, say, a maximum 5KB each.
                <br/>
                2. Read traffic for thumbnails will be huge compared to videos. Users will be
watching one video at a time, but they might be looking at a page that has 20 thumbnails of other videos.
<br/><br/>
<strong>Bigtable</strong> can be a reasonable choice here as it combines multiple files into one block to store on the disk and is very efficient in reading a small amount of data. Both of these are the two most significant requirements of our service. Keeping hot thumbnails in the cache will also help in improving the latencies and, given that thumbnails files are small in size, we can easily cache a large number of such files in memory.
                <br/><br/>
                <strong>Video Encoding: </strong>Newly uploaded videos are stored on the server and a new task is added to the processing queue to encode the video into multiple formats. Once all the encoding will be completed the uploader will be notified and the video is made available for view/sharing.
                we can have multiple worker machine which generate encoded videos (1080*MP4, 360*4K etc)
                <br/><br/>
                <img src="https://res.cloudinary.com/dixqxdivr/image/upload/v1692429634/Screenshot_2023-08-19_at_12.50.12_PM_ydovf7.png" loading='lazy' className='w-[700px] h-[300px]'></img>
                <br/><br/>
                <strong>Metadata Sharding:</strong>
                <br/><br/>
                Since we have a huge number of new videos every day and our read load is extremely high, therefore, we need to distribute our data onto multiple machines so that we can perform read/write operations efficiently. We have many options to shard our data. Let’s go through different strategies of sharding this data one by one:
                <br/><br/>
                <strong>Sharding based on UserID: </strong>We can try storing all the data for a particular user on one server. While storing, we can pass the UserID to our hash function which will map the user to a database server where we will store all the metadata for that user’s videos. While querying for videos of a user, we can ask our hash function to find the server holding the user’s data and then read it from there. To search videos by titles
we will have to query all servers and each server will return a set of videos. A centralized server will then aggregate and rank these results before returning them to the user.
                <br/><br/>
                This approach has a couple of issues:
                <br/><br/>
                1. What if a user becomes popular? There could be a lot of queries on the server holding that user; this could create a performance bottleneck. This will also affect the overall performance of our service.
                <br/>
                2. Over time, some users can end up storing a lot of videos compared to others. Maintaining a uniform distribution of growing user data is quite tricky.
                <br/><br/>
                To recover from these situations either we have to repartition/redistribute our data or used consistent hashing to balance the load between servers.
                <br/><br/>
                <strong>Sharding based on VideoID: </strong>Our hash function will map each VideoID to a random server where we will store that Video’s metadata. To find videos of a user we will query all servers and each server will return a set of videos. A centralized server will aggregate and rank these results before returning them to the user. This approach solves our problem of popular users but shifts it to popular videos.
                <br/>
                We can further improve our performance by introducing a cache to store hot videos in front of the database servers.
                <br/><br/>
                <strong>Video Deduplication:</strong>
                <br/><br/>
                Adding duplicate videos is waste of resources like storage, bandwidth etc.
                <br/>
                Deduplication makes most sense early; when a user is uploading a video as compared to post-processing it to find duplicate videos later. Inline deduplication will save us a lot of resources that can be used to encode, transfer, and store the duplicate copy of the video. As soon as any user starts uploading a video, our service can run video matching algorithms (e.g., Block Matching, Phase Correlation, etc.) to find duplications. If we already have a copy of the video being uploaded, we can either stop the upload and use the existing copy or continue the upload and use the newly uploaded video if it is of higher quality. If the newly uploaded video is a subpart of an existing video or, vice versa, we can intelligently divide the video into smaller chunks so that we only upload the parts that are missing.
                <br/><br/>
                <strong>Content Delivery Network (CDN):</strong>
                <br/><br/>
                Our service can move popular videos to CDNs:
                <br/><br/>
                CDNs replicate content in multiple places. There’s a better chance of videos being closer to the user and, with fewer hops, videos will stream from a friendlier network.
                <br/>
                CDN machines make heavy use of caching and can mostly serve videos out of memory.
                <br/><br/>
                <strong>Note: We can use load balancers and cache at many levels</strong>
            </p>
        </div>
    </div>
  )
}

export default YouTube