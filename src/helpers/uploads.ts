import firebaseApp from "@/config/firebase-config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";

export const uploadFileToFirebaseAndReturnUrl = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, file.name);
    const uploadFileResponse = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploadFileResponse.ref);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
