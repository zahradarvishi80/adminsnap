import { Api } from "@taban/api/api";
import { UserType,  AdminAuthType } from "@taban/dto";

export const AdminTestApi=async(user: UserType) =>{
    return new Promise<{
        auth: AdminAuthType;
    }>((resolve) => {
        const api = new Api({
            path: "/api/v1/admin/auth",
            method: "get",
            header: {
                "api-token": user?.token?.apiToken,
            },
        });
        return api.call().then((data: any) => {
            console.log(data);
            
                return resolve({
                    auth:castAuth(data),
                });
            })
          
    });
}



export const castAuth = (data: any): AdminAuthType => {
        return {
            id: data.id,
            username: data.username,
            phoneNumber: data.phone_number,
            lastName: data.last_name,
            firstName: data.first_name,
            status: "active" ,
            roles: data.roles,
        }}