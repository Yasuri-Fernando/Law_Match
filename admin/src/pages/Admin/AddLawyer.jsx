import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddLawyer = () => {
  const [lawImg, setLawImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Property Law");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);  // Change backendurl to backendUrl

const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (!lawImg) {
      return toast.error("Image Not Selected");
    }

    const formData = new FormData();
    formData.append("image", lawImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", Number(fees));
    formData.append("about", about);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append(
      "address",
      JSON.stringify({ line1: address1, line2: address2 })
    );

    // Debugging formData content
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Ensure backendUrl is defined before making the request
    if (!backendUrl) {
      return toast.error("Backend URL is not defined.");
    }

    // Send data to the backend
    const { data } = await axios.post(backendUrl + '/api/admin/add-lawyer', formData,{headers:{Authorization: `Bearer ${aToken}`}}

    );

    if (data.success) {
      toast.success(data.message)
      setLawImg(false)
      setName('')
      setPassword('')
      setEmail('')
      setAddress1('')
      setAddress2('')
      setDegree('')
      setAbout('')
      setFees('')
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    //console.error("Error adding lawyer:", error);
    toast.error(error.message)
    console.log(error)
  }
};


  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Lawyer</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="law-img">
              <img
                className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                src={lawImg ? URL.createObjectURL(lawImg) : assets.upload_area}
                alt="Upload"
              />
            </label>
            <input
              type="file"
              id="law-img"
              hidden
              onChange={(e) => setLawImg(e.target.files[0])}
            />
            <p>
              Upload lawyer <br />
              picture
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex-col gap-1">
                <p>Lawyer Name</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1 flex-col gap-1">
                <p>Lawyer Email</p>
                <input
                  className="border rounded px-3 py-2"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1 flex-col gap-1">
                <p>Lawyer Password</p>
                <input
                  className="border rounded px-3 py-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1 flex-col gap-1">
                <p>Experience</p>
                <select
                  className="border rounded px-3 py-2"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} Year`}>
                      {`${i + 1} Year`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex-col gap-1">
                <p>Fees</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  placeholder="Fees"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex-col gap-1">
                <p>Speciality</p>
                <select
                  className="border rounded px-3 py-2"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option value="Property Law">Property Law</option>
                  <option value="Civil Law">Civil Law</option>
                  <option value="Family Law">Family Law</option>
                  <option value="International Law">International Law</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Human Rights Law">Human Rights Law</option>
                </select>
              </div>

              <div className="flex-1 flex-col gap-1">
                <p>Education</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Education"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1 flex-col gap-1">
                <p>Address</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Address Line 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Address Line 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1 flex-col gap-1">
                <p className="mt-4 mb-2">About</p>
                <textarea
                  className="border rounded px-3 py-2"
                  placeholder="Write about lawyer"
                  rows={5}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
              >
                Add Lawyer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLawyer;
