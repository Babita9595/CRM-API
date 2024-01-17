//globally declared
var accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';
// let customField = document.getElementById("customField").value = window.location.href;



//handle search contact by email
const handleserachcontact = ()=>{
const email = document.getElementById('searchbyemail').value
console.log(email,'email ')
if(email){
fetch(`https://rest.gohighlevel.com/v1/contacts/lookup?email=${email}&phone=`,{
method: 'GET',
headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
}
})
.then(response => response.json())
.then(data => {
   
        allContactData(data.contacts)
        email = '' 
   
})
.catch(error => {
    console.error('Error fetching contact appointments:', error);
    
});
}else{
    checkApi() 
}

}


const checkApi =()=>{ 
    let apiEndpoint = 'https://rest.gohighlevel.com/v1/contacts'    
    fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        allContactData(data.contacts)
       
    })
    .catch(error => {
        console.error('Error fetching contact appointments:', error);
    });
}

const allContactData = (Alldata)=>{
    
  let tableHtml= '<h3>All Contact Data</h3>';
  tableHtml  += '<table class="table table-bordered mt-4">';
  tableHtml += '<thead>';
  tableHtml+= '<tr><th>contactId</th><th>contactName</th><th>email</th><th>phone</th><th>companyName</th><th>remove</th><th>update</th></tr>';
  tableHtml += '</thead>';
  tableHtml += '<tbody>';

  Alldata.forEach((alldata)=>{
    tableHtml += '<tr>';
    tableHtml += `<td>${alldata.id}</td>`;
    tableHtml += `<td>${alldata.contactName}</td>`;
    tableHtml += `<td>${alldata.email}</td>`;
    tableHtml += `<td>${alldata.phone}</td>`;
    tableHtml += `<td>${alldata.companyName}</td>`;
    tableHtml += `<td onclick="handleDelete('${alldata.id}')">remove</td>`;
    tableHtml += `<td  onclick="handleUpdate('${alldata}')">update</td>`;
    tableHtml += '</tr>';
  })
  tableHtml += '</tbody>'
  tableHtml += '</table>'
   contactDataTableDiv = document.getElementById("AllcontactData");
  contactDataTableDiv.innerHTML = tableHtml;
}
    

const handleDelete = (id)=>{
  if (confirm("Are you sure you want to delete this opportunity?")) {
    let apiEndpoint = `https://rest.gohighlevel.com/v1/contacts/${id}`;
    fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => {
        if (response.ok) {
            console.log(`Opportunity with ID ${opportunityId} deleted successfully.`);
            allContactData();
        } else {
            console.error('Error deleting opportunity:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting opportunity:', error);
    });
}}


const handleUpdate = (data)=>{
    const data = JSON.parse(data)
    const data2 = JSON.stringify(data)
    console.log(data2,'update')

    // Access properties of alldata
    console.log(id);
    
  // document.getElementById("contactId").value = id;
      // Update the form values with the fetched contact details
    //   document.getElementById("contactId").value = alldata.id || '';
    //   document.getElementById("firstname").value = alldata.firstName || '';
    //   document.getElementById("lastname").value = alldata.lastName || '';
    //   document.getElementById("email").value = alldata.email || '';
    //   document.getElementById("phone").value =alldata.phone || '';
    //    toggleForm();    
};

 
const toggleForm = ()=> {
    let formSection = document.querySelector('.form-section');
    formSection.style.display = (formSection.style.display === 'none') ? 'block' : 'none';
    document.getElementById("contactId").value = '';
}
  
const toggleExploreModel = () =>{
    let exploredata = document.querySelector('.exploredata');
    exploredata .style.display = (exploredata .style.display === 'none') ? 'block' : 'none';
}
    
    let loginForm = document.getElementById("testDriveForm");

        loginForm.addEventListener("submit", (e) => {
         e.preventDefault();
         let contactId = document.getElementById("contactId").value;
         let firstname= document.getElementById("firstname").value;
         let lastname= document.getElementById("lastname").value;
        //  let name = document.getElementById("name").value;
         let email = document.getElementById("email").value;
         let phone = document.getElementById("phone").value;
        //  let dateOfBirth = formatDateNumeric(document.getElementById("dateOfBirth").value);
         let dateOfBirth = document.getElementById("dateOfBirth").value;
         let address1 = document.getElementById("address1").value;
         let city = document.getElementById("city").value;
         let state = document.getElementById("state").value;
         let country = document.getElementById("country").value;
         let postalCode = document.getElementById("postalCode").value;
         let companyName = document.getElementById("companyName").value;
         let website = document.getElementById("website").value;
         let tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());
         let source = document.getElementById("source").value;
         let customField = document.getElementById("customField").value = window.location.href;

            let cusomFieldarray = []
            let objectkey = {store_url:customField}
            cusomFieldarray.push(objectkey)
            console.log(cusomFieldarray)
        
          let formData = {
            firstname: firstname,
           lastname: lastname,
            name: firstname+''+lastname ,
           email: email,
           phone: phone,
           dateOfBirth: dateOfBirth,
           address1: address1,
           city: city,
           state: state,
           country: country,
           postalCode: postalCode,
           companyName: companyName,
           website: website,
           tags: tags,
           source: source,
           customField: cusomFieldarray
   };
   
   let apiEndpoint = 'https://rest.gohighlevel.com/v1/contacts/';
   fetch(apiEndpoint, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`,
       },
       body: JSON.stringify(formData),
   })
   .then(response => response.json())
   .then(data => {
       console.log('API Response:', data);
    loginForm.reset();
    toggleForm() 
   })
   .catch(error => {
       console.error('Error:', error);
   });
         
});


//for fetching the data
function fetchContactAppointments() {
    let apiEndpoint = 'https://rest.gohighlevel.com/v1/contacts/qtwpYXVJUAyxAArTcsNH'
    fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Contact Appointments:', data);
        displayContactData(data.contact);
    })
    .catch(error => {
        console.error('Error fetching contact appointments:', error);
    });
    toggleExploreModel()
    function displayContactData(contact) {
        let tableHtml = '<h3>Contact Data</h3><table class="table table-bordered">';
        tableHtml += '<thead><tr><th>Email</th><th>Phone</th><th>Company Name</th><th>Tags</th><th>Start Date</th><th>End Date</th></tr></thead><tbody>';
            let tags = contact.tags ? contact.tags.join(', ') : '';

            tableHtml += `<tr>
                            <td>${contact.email}</td>
                            <td>${contact.phone}</td>
                            <td>${contact.companyName}</td>
                            <td>${tags}</td>   
                          </tr>`;
        tableHtml += '</tbody></table>';
        let contactDataTableDiv = document.getElementById("contactData");
        contactDataTableDiv.innerHTML = tableHtml;
    }   
}

 
    function toggleAllData() {
        let AllcontactData = document.getElementById('AllcontactData');
        AllcontactData.style.display = (AllcontactData.style.display === 'none') ? 'block' : 'none';
        let serchbyemail = document.getElementById("searchInputField")
        serchbyemail.style.display = (serchbyemail.style.display === 'none') ? 'block' : 'none';
       checkApi();
    }

