async function generateResume(){

  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const skills = document.getElementById("skills").value;
  const education = document.getElementById("education").value;
  const projects = document.getElementById("projects").value;
  const linkedin = document.getElementById("linkedin").value;

  document.getElementById("previewName").innerText = name;
  document.getElementById("previewTitle").innerText = title;

  document.getElementById("previewEmail").innerText =
    "📧 " + email;

  document.getElementById("previewPhone").innerText =
    "📞 " + phone;

  document.getElementById("previewLocation").innerText =
    "📍 " + location;

  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  document.getElementById("profileCircle").innerText =
    initials;

  try {

    const response = await fetch("/generate-resume",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        title,
        email,
        phone,
        location,
        skills,
        education,
        projects,
        linkedin
      })
    });

    const data = await response.json();

    document.getElementById("output").innerText =
      data.resume;

  } catch(error){

    console.log(error);

    document.getElementById("output").innerText =
      "Error generating resume";

  }

}