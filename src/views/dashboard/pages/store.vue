<template>
  <section class="main-dashboard">
    <!--Main -->
    <div class="main-header">
      <div class="main-dashboard-name">
        <h2>Manage STORE</h2>
      </div>
      <div class="main-dashboard-add" @click="addStore">
        <a href="#" class="btn" type="button">Add New Store</a>
      </div>
    </div>
    <div class="table-store">
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Location</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
        <tr v-for="store in stores" :key="store._id">
          <td>{{ store._id }}</td>
          <td>{{ store.storeName }}</td>
          <td>{{ store.category.name }}</td>
          <td>{{ store.location }}</td>
          <td>
            <img :src="store.imageUrl" alt="erorUserpost" style="width: 60%" />
          </td>
          <td>
            <a
              href="#"
              @click="editItem(store)"
              class="material-symbols-outlined"
            >
              <span><i class="fas fa-edit" style="color: blue"></i></span>
            </a>

            <a @click="deleteItem(store)" class="material-symbols-outlined">
              <span><i class="fas fa-trash-alt" style="color: red"></i></span>
            </a>
          </td>
        </tr>
      </table>
    </div>
    <!-- open add store-->
    <div class="popup">
      <form @submit.prevent="storeActions">
        <div class="container-addStore">
          <h3 style="padding: 15px; display: flex; justify-content: center">
            Add New Store
          </h3>
          <div class="upload-img">
            <input
              @input="handlerImage"
              style="
                position: absolute;
                opacity: 0;
                width: 30%;
                height: 70%;
                border: 1px solid;
                z-index: 99;
                cursor: pointer;
              "
              accept="image/*"
              type="file"
              name="image"
              id="imageUpload"
            />
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
              "
            >
              <img v-if="!store.imageUrl" src="../../../assets/img-acc/cloud-computing.png" alt="" />
              <img v-else style="width: 190px !important; height: 120px !important;" :src="store.imageUrl" alt=""/>
            </div>
          </div>
          <div class="input-info">
            <input
              class="input-value"
              required
              v-model="store.ownerName"
              type="text"
              id="ownerName"
              name="ownerName"
              placeholder="Owner's name"
            />
          </div>
          <div class="input-info" style="margin-top: 15%">
            <input
              class="input-value"
              required
              v-model="store.storeName"
              type="text"
              id="name"
              name="name"
              placeholder="Store's name"
            />
          </div>
          <div class="input-info" style="margin-top: 30%">
            <select
              style="width: 200px"
              name="categories"
              id="categories"
              v-model="store.category"
              required
            >
              <option value="Select a category">Select a category</option>
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="input-info" style="margin-top: 40%">
            <input
              class="input-value"
              type="location"
              id="location"
              name="location"
              placeholder="Add Location"
              v-model="store.location"
              required
            />
          </div>
          <div class="input-info" style="margin-top: 55%">
            <textarea
              class="input-value"
              name="description"
              id="description"
              placeholder="Description"
              v-model="store.desc"
              required
            ></textarea>
          </div>
          <div class="input-info-sub" style="margin-top: 10%">
            <input
              type="submit"
              style="background: #0e5fff; color: white; border: 1px solid grey"
              value="Confirm"
            />
            <input type="button" value="Cancel" @click="cancel" />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stores: [],
      categories: [],
      store: {
        storeName: "",
        ownerName: "",
        category: "",
        location: "",
        imageUrl: "",
        desc: "",
      },
      action: "",
    };
  },
  methods: {
    async getStore() {
      const res = await fetch(
        "http://18.183.253.100:3001/store/all?item_per_page=1000",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const resData = await res.json();
      this.stores = resData.data.stores.docs;
      console.log(this.stores);
    },

    addStore() {
      const openpopup = document.querySelector(".popup");
      openpopup.classList.add("popup-open");
      this.action = "create";
    },

    editItem(store) {
      const openpopup = document.querySelector(".popup");
      openpopup.classList.add("popup-open");
      (this.store = {
        _id: store._id,
        storeName: store.storeName,
        ownerName: store.ownerName,
        desc: store.desc,
        location: store.location,
        imageUrl: store.imageUrl,
        category: store.category._id,
      }),
        (this.action = "update");
    },

    cancel() {
      const closePopup = document.querySelector(".popup");
      closePopup.classList.remove("popup-open");
      //reset file image value
      // document.getElementById("img").value = "";
      //reset data form
      this.store = {
        storeName: "",
        ownerName: "",
        category: "",
        location: "",
        imageUrl: "",
        desc: "",
      };
    },

    async storeActions() {
      let url = "";
      if (this.action == "create") url = "http://18.183.253.100:3001/store/create";
      else url = "http://18.183.253.100:3001/store/update";

      console.log("create store");
      console.log(this.store);

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.store),
      });

      const res_data = await res.json();
      console.log("createStore", res_data);
      this.getStore();
      this.cancel();
    },

    async deleteItem(store) {
      console.log("delete item", store);
      const res = await fetch("http://18.183.253.100:3001/store/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: store._id }),
      });

      const resData = await res.json();
      console.log("delete store", resData);

      this.getStore();
    },

    async handlerImage(e) {
      console.log("file", e.target.files[0]);

      //upload image
      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      const upload_image = await fetch("http://18.183.253.100:3001/upload/image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const upload_image_data = await upload_image.json();
      console.log("upload image", upload_image_data);

      this.store.imageUrl = upload_image_data.data;
    },

    async getCategories() {
      const res = await fetch("http://18.183.253.100:3001/category/all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();
      this.categories = resData;
      console.log("get categories", this.categories);
    },
  },

  created() {
    this.getStore();
    this.getCategories();
  },
};
</script>

<style scoped>
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.561);
  top: 0px;
  left: 0px;
  visibility: hidden;
  z-index: 99;
}
.popup.popup-open {
  visibility: visible;
}

form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  border: 1px solid rgb(196, 196, 196);
  padding: 12px;
  background-color: white;
  /* text-align: center; */
}

.btn {
  border: 2px solid black;
}
.container-addStore {
  position: absolute;
  width: 576px;
  height: 750px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.upload-img {
  position: relative;
  width: 476px;
  height: 150px;
  top: 10px;
  left: 8.5%;
  /* left: 50%;
            top: 50%;
            transform: translate(-50%, -50%); */
  background: #ffffff;
  border: 2px dashed #000000;
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-img img {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-info {
  top: 25px;
  position: relative;
  left: 8.5%;
}

.input-info input,
.input-info select,
.input-info option {
  position: absolute;
  width: 476px;
  height: 66px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
}

.input-info-sub {
  position: relative;
  left: 8.5%;
}
.input-info-sub input {
  width: 76px;
  height: 36px;
  margin-right: 3%;
}

.input-value {
  padding-left: 20px;
}

textarea {
  width: 276px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
}
</style>
