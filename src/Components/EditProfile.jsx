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
    } catch (error) {
      const errorMsg = error?.message || String(error);
      console.error("Something went wrong", error);

      if (errorMsg.includes("Failed to fetch")) {
        setError("Network error! Updation failed ");
      } else if (
        errorMsg.includes("SSL") ||
        errorMsg.includes("ssl3_read_bytes") ||
        errorMsg.includes("tlsv1 alert internal error")
      ) {
        setError("Connection issue. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    user && (
      <>
        <div className="bg-gradient-to-br from-yellow-100 via-orange-300 to-yellow-200 flex items-center gap-8 justify-center">
          <div className="min-h-screen flex bg-orange-250 px-2 py-2">
            <div
              className="
              w-[700px] max-w-xl rounded-3xl
              bg-yellow-50 p-4 md:p-6
              shadow-[0_8px_8px_0_#f59e42]
              border border-orange-250
              flex flex-col items-center
              relative
            "
            >
              {/* Title */}
              <h2 className="text-3xl font-bold text-orange-700 mb-1 text-center font-mono">
                Edit Profile
              </h2>
              <p className="text-orange-400 mb-3 text-center font-mono text-sm">
                Update your information
              </p>
              {/* Form */}
              <form
                className="w-full flex flex-col gap-4 font-mono"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    First Name
                  </label>
                  <div className="flex items-center bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 text-orange-300 text-base">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      id="firstName"
                      value={firstName}
                      type="text"
                      placeholder="First Name"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 text-base font-mono"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    Last Name
                  </label>
                  <div className="flex items-center bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 text-orange-300 text-base">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Last Name"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 text-base font-mono"
                    />
                  </div>
                </div>
                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    Gender
                  </label>
                  <div className="flex items-center bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 text-orange-300 text-base">
                      <i className="fa fa-user" />
                    </span>
                    <input
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      type="text"
                      placeholder="Gender"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 text-base font-mono"
                    />
                  </div>
                </div>
                {/* Photo URL */}
                <div>
                  <label
                    htmlFor="photoUrl"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    Photo URL
                  </label>
                  <div className="flex items-center bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 text-orange-300 text-base">
                      <i className="fa fa-image" />
                    </span>
                    <input
                      id="photoUrl"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      type="text"
                      placeholder="Photo URL"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 text-base font-mono"
                    />
                  </div>
                </div>
                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    Age
                  </label>
                  <div className="flex items-center bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 text-orange-300 text-base">
                      <i className="fa fa-calendar" />
                    </span>
                    <input
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      placeholder="Age"
                      min="0"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 text-base font-mono"
                    />
                  </div>
                </div>
                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    Bio
                  </label>
                  <div className="flex items-start bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 mt-1 text-orange-300 text-base">
                      <i className="fa fa-info-circle" />
                    </span>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Bio"
                      rows={2}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 resize-none text-base font-mono"
                    />
                  </div>
                </div>
                {/* Skills */}
                <div>
                  <label
                    htmlFor="skills"
                    className="block mb-1 font-bold text-orange-700 text-base font-mono"
                  >
                    Skills (comma separated)
                  </label>
                  <div className="flex items-center bg-yellow-50 rounded-full px-4 py-3 shadow-[0_3px_0_0_#f59e42] border border-orange-200">
                    <span className="mr-2 text-orange-300 text-base">
                      <i className="fa fa-star" />
                    </span>
                    <input
                      id="skills"
                      value={skillsInput}
                      onChange={handleSkillsInputChange}
                      onBlur={handleSkillsBlur}
                      type="text"
                      placeholder="Skills (comma separated)"
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-orange-300 text-base font-mono"
                    />
                  </div>
                </div>
                {/* Error Message */}
                {error && (
                  <p className="text-red-700 text-sm mt-1 font-mono">{error}</p>
                )}
                {/* Save Button */}
                <button
                  onClick={saveProfile}
                  type="submit"
                  className="
                  mt-2 w-full py-3 rounded-full
                  bg-yellow-400
                  text-gray-900 font-bold text-lg font-mono
                  border border-orange-400
                  shadow-[0_6px_0_0_#f59e42]
                  transition-all duration-100
                  hover:shadow-[0_3px_0_0_#f59e42]
                  active:shadow-none
                  active:translate-y-1
                  focus:outline-none
                  select-none
                  cursor-pointer
                "
                >
                  Save
                </button>
              </form>
              {/* Links */}
              <div className="mt-3 text-center text-orange-400 text-xs font-mono">
                <Link
                  to="/"
                  className="font-bold text-orange-600 cursor-pointer"
                >
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
