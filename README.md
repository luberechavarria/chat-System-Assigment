# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Set up project for week-4
#### use nvm use 18.10.0  
1. Create a folder called `week4tut` 
2. Open terminal inside of folder week4tut.
3.  run `npm install -@angular/cli`,
   #### Setting:
   ```Run new chat-system, this will create a new angular project and then set the configuration for your project as instructed below 
      If you want to set the router "YES"
      What style to use, by default is "CSS", stay with that one
   ```
4. As soon as a new  project is created change the director from week4tut to chat-system using the terminal.
5. #### Development server
   Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any 
   of the source files.
   
### Some commands to use in termianal:
   ```ng serve --open```
    ```ng serve --open```
     ```ng generate component FolderName```
   

### Brief explanation of some files:
|File name  |  Description| 
|:-----|:-------|
| gitignore|Git source repository system |
| package.json | npm uses information in this file to know the libraries it needs to build and run the project |
| node_modules | npm  install package here, It stays like that, not modify it.|
| README.md | A text file that you can to describe the project. By default, it has information on how to run the project.|
|tsconfig.json| The TypeScript compiler uses this file for various settings |
| src/ | The src directory contend all your files that are going to be uploaded to the web server, however, it has run the first build to create a folder that is the one to upload to the server.|

  ### Documentation - Phase 1:
   `User:` A registered participant in the project with the capability to read and write messages. Depending on
       their permissions,they may also have the authority to modify the database content.
       Group: In accordance with the assignment specification, a designated entity where users can be assigned
       and granted access to
       view various channels. Additionally, a Group may have a Group Assistant who aids in managing its 
       activities.Channel: A communication space where users can compose messages and access chat history.
       Channels are associated with specific groups, and access to each channel is restricted to designated users,
       ensuring controlled participation.
   
 ### Git:
  
       `Layout:` All the tasks completed for Phase 1 are currently hosted on the Main branch, serving as the foundation
       for ongoing development. During Phase 1, to ensure code safety in case of unexpected issues, I adopted a practice of
       working on different branches for each specific task. These task-specific branches were later merged into the Master
       branch, which now houses the consolidated main codebase. This approach provides both version control and a structured
       workflow, safeguarding the project's integrity and allowing for efficient development.
      
       Commit Good Practices: Throughout the development process, I made commitments to the repository at strategic points.
       Commits were made when adding a new block of functionality, especially when the option for rollback might be necessary.
       This approach saved time as it eliminated the need for continuous commits to the main repository, thereby keeping the
       commit history concise and meaningful.
       Additionally, I committed changes at the end of each development session. This practice ensured that no progress was lost
       and allowed me to work on the most up-to-date version of my application during the next session. This disciplined commitment
       strategy contributed to efficient and organized development.
   

 ### For phase 1 of the assignment, there are all branches.:
   
     ```
      master, Add-JSON-file-updateViews, clone-week-5,
      create-groups, create-homechat-html, create-services, create-user-type-structure, main-view-chat,
      roles-groupAdmin, superAdmin-roles
   ```
 ### Data structure:
     Project Requirements: This project entails a requirement in which data extracted from a database (to be implemented in Phase 2)
     plays a pivotal role in dynamically altering the user's interaction with the site. To facilitate this, the project employs four distinct
     types of data structures. Collectively, these structures encompass all the necessary information to realize the functionality outlined in
     the assignment specifications.

      Project Data Management: Although a traditional database is not yet implemented, a JSON file system is currently employed to persist
      data, ensuring efficient data management throughout the project's phases.
      The project comprises three distinct JSON arrays:
      `JSON User Array:` This array serves as a repository for user-related data, including user profiles, roles, and permissions.
      `JSON Groups Array:` Here, group-specific information is stored, including the assignment of users and channels, as well as any Group Assistants.
      `JSON Channels Array:` This array is dedicated to storing data pertaining to communication channels, specifying which users have access to each
      channel, and preserving chat history.
      While not a traditional database, these JSON data structures provide the necessary foundation for data persistence and retrieval, facilitating
      effective project development and testing.

   
 ### User Data Structure:
       The user data structure is represented as an array of user objects, each containing comprehensive information about registered users and
       their respective permissions. A user object adheres to a standardized format, as 
        exemplified below:
        
        {
        "id": UUID,
        "username": <String>,
        "email": <String>,
        "login": <boolean>,
        "pwd": <String>,
        "roles": <String[ ]>,
        "groups": String[ ],
        "avatar": String,
        }
        
        `Value Explanations:`
        id: A unique numerical identifier assigned to each user, ensuring their distinct recognition within the system.
        username: A user-defined name for their account, visible to other users, and also required to be unique to prevent duplicates.
        `email:` The email address associated with the user's account, serving as a means of communication and identification. This information
        is typically not visible to other users without specific permissions.
        password: The user's password, is used for authentication during the login process to verify the user's claimed identity.
        `role:` An array that contains superAdmin or groupAdmin or user, signifying the level of permissions granted to the user within the application.
        user indicates no special permissions, groupAdmin designates privileges, and 
        superAdmin signifies Super Admin status. The identification of Group Assistants is determined within the group data object, offering an additional
        layer of access control.
        Groups: An Array that contains ids of the groups this user belongs
   
 ### Groups Data Structure:
   ```
      The group data structure is an array comprising group objects. These objects encompass essential details, including the user associated
 with a specific group, alongside additional relevant information.
      
      
      
      {
      "id": UUID,
      "username": <String>,
      "userIdGroup": <string[ ]>,
      }
      
      Value Descriptions:
      id: A distinct numeric identifier assigned to this group, ensuring its uniqueness within the system.
      username: A user-friendly title representing the group, visible to end users for easy identification.
      userIdGroup: An array comprising UUIDs of users who have been included as members of this group, allowing user management within the group.
      
      
      
      
      
      Channels Data Structure: Within the channels array, individual channel objects are stored, each carrying crucial data regarding
     the chat history within a specific channel. Additionally, these objects specify which users are granted access to the channel, thus regulating
      participation effectively.
      
      {
      "id": UUID,
      "username": <String>,
      "name": <String>,
      "group": <number>,
      "userIdChannels": <string[ ]>,
      }
      
      Channel Properties:
      id: A distinctive identifier unique to this channel, ensuring its individuality within the system.
      username: A user-friendly title representing the channel, visibly displayed in the user interface for easy identification.
      group: A list of IDs that tells, that this channel belongs to this ID group.
      userIdChannels: A list of IDs that tells, this channel belongs to this id user.
   ```

 ### Message Object.:
   ```
    Within this object, essential details related to a specific message are consolidated. This includes identification information, the message's content, and the user responsible for posting the message.

    {
    "id": UUID,
    "autor": <String>,
    "content": <String>,
    }
    
    Message Attributes:
    id: A distinctive identifier exclusively assigned to this message, ensuring its uniqueness within the system.
    author: The unique identifier of the message's author, linking the message to its creator.
    content: A textual string encapsulating the content of the message, conveying the message's essence.
```
### Front-End:
   ```
    Project Components:
    In this Angular project, the architecture relies on a streamlined set of four components. Each component corresponds to
    a distinct page within the application, encompassing the following:
    Home:
    This is the program's default route, accessible by navigating to "/". It acts as the host for the router module and functions
    as a container for all other pages within the application.
    The code within this component plays a pivotal role in managing user navigation. Specifically, it handles redirects:
    When a user is not logged in, it redirects them to "/login".
   Upon successful authentication, users are redirected to "/groups".
   Additionally, this component is responsible for extracting JSON data from local files during the initial page load. However, it's
   important to note that this data retrieval process is temporary and will be replaced with enhanced functionality integrated into other
   components during Phase 2 of the assignment.
  
  
   Login:
   The login page, accessible via the "/login" route, serves as the gateway for user authentication. It encompasses essential elements:
   User Input Fields: This page features two text input fields, one for the username and another for the password, providing the necessary
   fields for user credentials.
   Submit Button: A submission button allows users to initiate the login process upon entering their credentials.
   Error Dialog Box: In case of invalid credentials, a hidden dialog box is in place to discreetly present an error message to the user,
   guiding them towards a successful login.
   Upon successful authentication, users are seamlessly redirected to the "/Home" route. Here, they gain access to their assigned groups
   and channels, as well as the chat history, facilitating engagement within the application.
  
  
   Profile: This component views the information of the user.
   Profile: This component views the information of the user and allows to edit it.
   To enhance the visual presentation and user experience, all components have been meticulously styled using the CSS and JavaScript resources
   provided by the Bootstrap library. This approach ensures a cohesive and aesthetically pleasing interface throughout the application.

   ```
 ### Some features will be improved in the second phase of the App.:
  
      `Create group modal:` Within this section, users are presented with a straightforward interface for creating a new group. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired name for the new group, facilitating easy customization.
      Submit Button: Upon entering the new group name, users can trigger the creation process by clicking the "Submit" button.
      To execute the group creation, a request is made to the server using the URL 'http://localhost:3000/api/createGroup.' This request includes two
      essential parameters: 'user who is login' and 'newGroupName.' These parameters enable seamless communication with the server, resulting in the successful creation of the new group.

      `Create promote user as Admin modal:`
      Within this section, users are presented with a straightforward interface for promoting user as admin. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired email for the new user who will be admin, facilitating easy customization.
      Submit Button: Upon entering the new group name, users can trigger the creation process by clicking the "Submit" button.
      To execute the user as admin, a request is made to the server using the URL 'http://localhost:3000/api/promoteUserAsAdmin'.' This request includes two
      essential parameters: 'user who is login' and 'groupName.' These parameters enable seamless communication with the server, resulting in the successful promotion user to Admin.

      `Create remove user modal:`
      Within this section, users are presented with a straightforward interface for promoting the remove of user. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired email for the user who will be removed, facilitating easy customization.
      Submit Button: Upon entering the remove user, users can trigger the creation process by clicking the "Submit" button.
      To execute the remove user creation, a request is made to the server using the URL 'http://localhost:3000/api/removeUser'.' This request includes two essential
      parameters: 'user who is login' and 'userEmail to be remove.' These parameters enable seamless communication with the server, resulting in the
      successful promotion user to Admin.

      `Create create new user modal:`
      Within this section, users are presented with a straightforward interface for promoting the creation of  user. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired email for the user who will be create, facilitating easy customization.
      Submit Button: Upon entering the creation user, users can trigger the creation process by clicking the "Submit" button.
      To execute the new user creation, a request is made to the server using the URL 'http://localhost:3000/api/createNewUser.' This request includes two
      essential parameters: 'user who is login' and 'user email to be removed.' These parameters enable seamless communication with the server, address email, username, pwd.

      `Create add user to group model:`
      Within this section, users are presented with a straightforward interface for promoting the adding user to a group. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired email for the user who will be added and groupId, facilitating easy customization.
      Submit Button: Upon entering the adding user, users can trigger the adding process by clicking the "Submit" button.
      To execute the adding user, a request is made to the server using the URL 'http://localhost:3000/api/addExisedUserToGroup.' This request includes two
      essential parameters: 'user who is login' and 'user email to be added and groupName.' These parameters enable seamless communication with the server,
      address email, username, pwd.

      `Create remove group modal:`
      Within this section, users are presented with a straightforward interface for promoting the removing group. It encompasses the following components:
      Text Input Field: A single text field is provided for groupName to be remove, facilitating easy customization.
      Submit Button: Upon entering the removing groupr, users can trigger the adding process by clicking the "Submit" button.
      To execute the remove group, a request is made to the server using the URL 'http://localhost:3000/api/removeGroup.' This request includes two essential
      parameters: 'user who is login' and 'groupName.' These parameters enable seamless communication with server.

      `Create remove user from group modal:`
      Within this section, users are presented with a straightforward interface for removing user. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired email for the user who will be removed, facilitating easy customization.
      Submit Button: Upon entering the remove user, users can trigger the remove process by clicking the "Submit" button.
      To execute the remove user, a request is made to the server using the URL 'http://localhost:3000/api/removeUser.' This request includes two essential
      parameters: 'user who is login' and 'user email to be removed.' These parameters enable seamless communication with the server, the user who is login, user email to be removed.

      `Create add channel to group modal:`
      Within this section, users are presented with a straightforward interface for adding a channel to a group. It encompasses the following components:
      Text Input Field: A single text field is provided for users to input the desired groupId and new channel name, facilitating easy customization.
      Submit Button: Upon entering the adding channel to group, users can trigger the adding process by clicking the "Submit" button.
      To execute the adding channel to the group, a request is made to the server using the URL 'http://localhost:3000/api/addChannelToGroup.' This request includes
      two essential parameters: 'user who is login' and 'groupId.' These parameters enable seamless communication with the server, the user who is login, new channel name.
      Create remove channel modal:
      Create remove user from cahnnel modal:

   
