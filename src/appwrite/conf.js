import conf from "../config/config";
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
            this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseId,
                conf.appwritecollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseId,
                conf.appwritecollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }

    // file upload
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwritebucketId,
                fileID,
            )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwritebucketId,
            fileID
        )
    }
}


const service = new Service()
export default service