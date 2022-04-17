import { getAuth, updatePassword } from "firebase/auth";

export const resetPassword = async ( newPass ) => {

    const auth = getAuth();

    const user = auth.currentUser;
    const newPassword = newPass;

    var status = 'processing'

    await updatePassword(user, newPassword).then(() => {

        status = 'password_changed'

    }).catch((error) => {

        console.log(error);

    });

    return status;

}