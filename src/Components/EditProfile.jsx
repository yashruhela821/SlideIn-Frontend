import { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Notification from "./Notification"; // <-- Import the notification

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [gender, setGender] = useState(user?.gender || "");
  const [skillsInput, setSkillsInput] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // <-- Success notification state
  const dispatch = useDispatch();
  // Input handler
  const handleSkillsInputChange = (e) => {
    setSkillsInput(e.target.value);
  };

  // When user leaves the input (onBlur) or on Save, update the skills array:
  const handleSkillsBlur = () => {
    const skillsArray = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
    setSkills(skillsArray);
  };

  const saveProfile = async () => {
    try {
      const response = await fetch(BASE_URL + "/profile/edit", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          bio,
          skills,
          photoUrl,
          gender,
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }

      if (!response.ok) {
        setError(
          typeof data === "string"
            ? data
            : data.error || data.message || "Failed to update profile"
        );
        setSuccessMessage("");
        return;
      }

      dispatch(addUser(data.user));
      setError("");
      setSuccessMessage(data.message || "Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-hide after 3s
    } catch (err) {
      setError(err.message || "Failed to update profile");
      setSuccessMessage("");
    }
  };

  return (
    user && (
      <>
        <div className="bg-[#e9eef4] flex items-center gap-8 justify-center">
          <div className="min-h-screen flex bg-[#e9eef4] px-2 py-4">
            <div
              className="
                w-[700px] max-w-xl rounded-3xl
                bg-[#f5f7fa] p-4 md:p-6
                shadow-[8px_8px_32px_#d1d9e6,-8px_-8px_32px_#fff]
                flex flex-col items-center
                relative
              "
            >
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-1 text-center">
                Edit Profile
              </h2>
              <p className="text-gray-400 mb-3 text-center font-medium text-sm">
                Update your information
              </p>
              {/* Form */}
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    First Name
                  </label>
                  <div className="flex items-center bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 text-gray-300 text-base">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      id="firstName"
                      value={firstName}
                      type="text"
                      placeholder="First Name"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 text-base"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    Last Name
                  </label>
                  <div className="flex items-center bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 text-gray-300 text-base">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Last Name"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>
                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    Gender
                  </label>
                  <div className="flex items-center bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 text-gray-300 text-base">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      type="text"
                      placeholder="Gender"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>
                {/* Photo URL */}
                <div>
                  <label
                    htmlFor="photoUrl"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    Photo URL
                  </label>
                  <div className="flex items-center bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 text-gray-300 text-base">
                      <i className="fa fa-image" />
                    </span>
                    <input
                      id="photoUrl"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      type="text"
                      placeholder="Photo URL"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>
                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    Age
                  </label>
                  <div className="flex items-center bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 text-gray-300 text-base">
                      <i className="fa fa-calendar" />
                    </span>
                    <input
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      placeholder="Age"
                      min="0"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>
                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    Bio
                  </label>
                  <div className="flex items-start bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 mt-1 text-gray-300 text-base">
                      <i className="fa fa-info-circle" />
                    </span>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Bio"
                      rows={2}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 resize-none text-base"
                    />
                  </div>
                </div>
                {/* Skills */}
                // In your JSX:
                <div>
                  <label
                    htmlFor="skills"
                    className="block mb-1 font-medium text-gray-600 text-base"
                  >
                    Skills (comma separated)
                  </label>
                  <div className="flex items-center bg-[#f5f7fa] rounded-xl px-3 py-2 shadow-[inset_2px_2px_8px_#d1d9e6,inset_-4px_-4px_12px_#fff]">
                    <span className="mr-2 text-gray-300 text-base">
                      <i className="fa fa-star" />
                    </span>
                    <input
                      id="skills"
                      value={skillsInput}
                      onChange={handleSkillsInputChange}
                      onBlur={handleSkillsBlur}
                      type="text"
                      placeholder="Skills (comma separated)"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>
                {/* Error Message */}
                {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
                {/* Save Button */}
                <button
                  onClick={saveProfile}
                  type="submit"
                  className="
        mt-2 w-full py-3 rounded-xl
        bg-gradient-to-r from-blue-400 to-cyan-400
        text-white font-semibold text-lg
        shadow-[2px_2px_12px_#d1d9e6,-2px_-2px_12px_#fff]
        hover:from-blue-500 hover:to-cyan-500 transition
      "
                >
                  Save
                </button>
              </form>

              {/* Links */}
              <div className="mt-3 text-center text-gray-400 text-xs">
                <Link to="/" className="font-bold text-blue-500 cursor-pointer">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-20">
            <UserCard
              user={{ firstName, lastName, bio, skills, age, photoUrl }}
            />
          </div>
        </div>
        {/* Notification at the bottom */}
        <Notification
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      </>
    )
  );
};

export default EditProfile;
