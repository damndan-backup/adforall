AMS Backend Structure
==============================

This document describes the AMS Backend Structure

Use Mongodb for flexibility / scalability 
Later it may serve better to swith users(Advertiser, Developer) 
to Sql. If that happens, it will not be too hard cuz we have mongo

1) Advertisement & App Registration Flow:
    - Advertisers 

    - Advertiser Side Model Hierarchy:

                Advertiser       -------- Provides funds, which bubble down
                /       \
            /     \          \
          Ad       Ad        Ad  -------- Provides Amazon S3 key & Specific Targeting info

    - Publisher Side Model Hierarchy:

                Publisher        -------- Registers Apps to get AppIds
                /       \
              App        App     -------- Holds App Ids & Secret Keys


2) Advertisement Serving Flow:
    - Device requests Ad with App Id & Secret Key
    - It would be nice if the secret key can be decoded with a server side key
      to know that it belongs to a certain App & Developer. The decoded string
      should hold some parameters:
            - Is Valid
            - AppId
            - DeveloperId

    - This way, we can validate each request in a very fast way.

    - Ad Serving Diagram:
        
        Device   ------- encrypt App Id & Developer Id. Send Targeting info
          |
         AMS     ------- Decrypt String to get: AppId, DeveloperId.
          |
       DB Server ------- Receive Query from AMS with targeting info. Get Ad
          |
         AMS     ------- Receive Ad info. Extract S3 key, and update viewcount
          | 
        Device   ------- With S3 key, request Ad mp3 file from s3 storage.
          | 
      Log Server ------- Receive success info from Device, Log serving data.

    - Ad Querying b/w AMS & DB Server
        There are limited amount of targeting info:
            targeting_info: {
                sex: Number, max3, //
                age: [Number], // specify age range. Each number corresponds to a range
                loc:    // Use default mongodb loc
                time: Date // Time 
            }

        Each of these fields may be absent. Absenece of each field must point
        to a default value so that the server knows how to query. 
        
        ex) sex => check equality
            age => check contains
            loc => default mongodb operation
            time => default mongodb operation

3) Analytics Flow
