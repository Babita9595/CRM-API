
document.addEventListener('DOMContentLoaded',pipelineApi());



function pipelineApi() {
    let accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';
    let apiEndpoint = 'https://rest.gohighlevel.com/v1/pipelines';

    fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('pipelines:', data);
        displayPipelineData(data.pipelines);
    })
    .catch(error => {
        console.error('Error fetching pipeline data:', error);
        // Handle errors
    });


}

    function displayPipelineData(pipelines) {
        let pipelineTableHtml = '<h3>Pipeline Data</h3>';
        pipelineTableHtml += '<table class="table table-bordered mt-4">';
        pipelineTableHtml += '<thead>';
        pipelineTableHtml += '<tr><th>ID</th><th>Name</th><th>Stages</th></tr>';
        pipelineTableHtml += '</thead>';
        pipelineTableHtml += '<tbody>';

        pipelines.forEach(pipeline => {
            pipelineTableHtml += '<tr>';
            pipelineTableHtml += `<td>${pipeline.id}</td>`;
            pipelineTableHtml += `<td>${pipeline.name}</td>`;
            pipelineTableHtml += '<td>';

            if (pipeline.stages && pipeline.stages.length > 0) {
                pipeline.stages.forEach(stage => {
                    pipelineTableHtml += `${stage.name}, `;
                });
                // Remove the trailing comma and space
                pipelineTableHtml = pipelineTableHtml.slice(0, -2);
            }

            pipelineTableHtml += '</td>';
            pipelineTableHtml += '</tr>';
        });

        pipelineTableHtml += '</tbody>';
        pipelineTableHtml += '</table>';

        let pipelineDataTableDiv = document.getElementById("pipelineData");
        pipelineDataTableDiv.innerHTML = pipelineTableHtml;
    }


function openPipeline() {
    var pipelinediv = document.getElementById("pipelineData");
    pipelinediv.style.display = (pipelinediv.style.display === "none" || pipelinediv.style.display === "") ? "block" : "none";
    pipelineApi()
}


function openForm() {
    var form = document.getElementById("opportunityForm");
    form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
    
}

//submitting the opportunity form
let opportunityform = document.getElementById("opportunityForm");

opportunityform.addEventListener('submit',(event)=>{
    event.preventDefault()
        // Get all elements with class 'opportunity-input'
        var inputElements = document.getElementsByClassName('opportunity-input');
        var formData = {};
        for (var i = 0; i < inputElements.length; i++) {
          var input = inputElements[i];
          formData[input.name] = input.value;
        }
        // Log the array for testing (you can remove this in the actual implementation)
        console.log(formData,'formdata');

        let accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';
        let apiEndpoint = 'https://rest.gohighlevel.com/v1/pipelines/imlbJBF3KSozhf9IVV7y/opportunities';
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
            console.log('API PipeResponse:', data);
             // Clear form values
            
             opportunityform.reset();
         
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
     
})


function openOpportunityTable() {
    var opportunityData= document.getElementById("pipelineData");
    opportunityData.style.display = (opportunityData.style.display === "none" || opportunityData.style.display === "") ? "block" : "none";
    
    //all opportunities data
let accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';
// let apiEndpoint = 'https://rest.gohighlevel.com/v1/pipelines/imlbJBF3KSozhf9IVV7y/opportunities/0AYAyoW0JsEoJsTIS6MI';
let apiEndpoint = 'https://rest.gohighlevel.com/v1/pipelines/imlbJBF3KSozhf9IVV7y/opportunities';


fetch(apiEndpoint, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
})
.then(response => response.json())
.then(data => {
    showData(data)
})
.catch(error => {
    // console.error('Error fetching pipeline data:', error);
    // Handle errors
});
}





//show all apportunities data

function showData(data) {
    // Get the pipeline data div and the opportunity table
    let pipelineTableHtml = '<h3>All opportunities Data</h3>';
        pipelineTableHtml += '<table class="table table-bordered mt-4">';
        pipelineTableHtml += '<thead>';
        pipelineTableHtml += '<tr><th>ID</th><th>Name/title</th><th>Monetary Value</th><th>Status</th><th>Contact Name</th><th>Email</th><th>Phone</th><th>delete</th><th>update</th></tr>';
        pipelineTableHtml += '</thead>';
        pipelineTableHtml += '<tbody>';

        data.opportunities.map(opportunity => {
            pipelineTableHtml += '<tr>';
            pipelineTableHtml += `<td>${opportunity.id}</td>`;
            pipelineTableHtml += `<td>${opportunity.name}</td>`;
            pipelineTableHtml += `<td>${opportunity.monetaryValue}</td>`;
            pipelineTableHtml += `<td>${opportunity.status}</td>`;
            pipelineTableHtml += `<td>${opportunity.contact.email}</td>`;
            pipelineTableHtml += `<td>${opportunity.contact.name}</td>`;
            pipelineTableHtml += `<td>${opportunity.contact.phone}</td>`;
            pipelineTableHtml += `<td  onclick="handleDelete('${opportunity.id}','delete')">delete</td>`;
            pipelineTableHtml += `<td onclick="handleDelete('${opportunity.id}','update')" >update</td>`;
            
            pipelineTableHtml += '</tr>';
        });

        pipelineTableHtml += '</tbody>';
        pipelineTableHtml += '</table>';

        let pipelineDataTableDiv = document.getElementById("pipelineData");
        pipelineDataTableDiv.innerHTML = pipelineTableHtml;
    }

    const handleDelete = (opportunityId,action)=>{
        
            if (action === 'delete') {
                // Prompt the user for confirmation or implement your logic
                if (confirm("Are you sure you want to delete this opportunity?")) {

                    let accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';
                    let apiEndpoint = `https://rest.gohighlevel.com/v1/pipelines/imlbJBF3KSozhf9IVV7y/opportunities/${opportunityId}`;
                
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
                            openOpportunityTable();
                        } else {
                            console.error('Error deleting opportunity:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting opportunity:', error);
                    });
            
                    
                }
            } else if (action === 'update') {
                // Implement update logic here
                openUpdateModal(opportunityId);
                console.log('update')

            } else {
                // Handle other actions as needed
      }
       
    }

    function openUpdateModal(opportunityId) {
        // Fetch opportunity data based on opportunityId
        let accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';
        let apiEndpoint = `https://rest.gohighlevel.com/v1/pipelines/imlbJBF3KSozhf9IVV7y/opportunities/${opportunityId}`;
    
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Fill the form with existing data
            fillUpdateForm(data);
            // Open the modal
            $('#updateModal').modal('show');
            console.log('updatedata',data)
        })
        .catch(error => {
            console.error('Error fetching opportunity data for update:', error);
            // Handle errors
        });
    }


    function fillUpdateForm(data) {
        // Fill the update form fields with existing data
       const oppntitle = document.getElementById('updateName').value = data.name;
       const oppnmoneytory = document.getElementById('updatemonetory').value = data.monetaryValue;
       const oppnstatus = document.getElementById('updateStatus').value = data.status;
       const oppnstageid = document.getElementById('pipelineStageId').value = data.pipelineStageId;
    //    const oppnsphone = document.getElementById('updatePhon').value = data.pipelineStageId;
       
        // Add code to fill other form fields as needed
    }updatePhon



    //update

    