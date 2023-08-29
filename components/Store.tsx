import { toast } from "react-toastify";
import { Web3Storage } from "web3.storage";


export const StoreData = async (files: any) => {
  toast.info("Storing data on IPFS...");
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdBNjFGOTQ4RkExNWM4QUZCMzU3ZDdlNGQzMjJEMjQ0MzMzZTQ0MUQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkyNTI4NTY1NTIsIm5hbWUiOiJhaSJ9.St6xCU6PbIKARwEBzXPYvn8pqieiQoTmee5ogLEAv8I",
  });

  const cid = await client.put([files])
  toast.success("Data stored on IPFS");
  return cid;
};
