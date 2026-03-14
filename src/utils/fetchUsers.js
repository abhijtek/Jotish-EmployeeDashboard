import axios from "axios";

export async function fetchUsers() {

  try {

    const res = await axios.post(
      "https://backend.jotish.in/backend_dev/gettabledata.php",
      {
        username: "test",
        password: "123456"
      }
    );
    console.log("res received from back",res);
    return res.data.TABLE_DATA.data;

  } catch (error) {

    console.error("fetching failed", error.message);

    return [];

  }

}