import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBTwatR3dOAq4ls0NOl0NVvSKd8vWa41a8",
  authDomain: "capstone-project-react-fd52b.firebaseapp.com",
  projectId: "capstone-project-react-fd52b",
  storageBucket: "capstone-project-react-fd52b.appspot.com",
  messagingSenderId: "145909161701",
  appId: "1:145909161701:web:0bd7dda924423c36e8fe0c",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
