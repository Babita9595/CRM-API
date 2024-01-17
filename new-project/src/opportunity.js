
let accessToken = '20da0077-69bd-47fb-9004-72caa4b60099';

const showAllOpportunity = () => {

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

function showData(data) {
    // Get the pipeline data div and the opportunity table
    let pipelineTableHtml = '<h4>All opportunities Data Based On PipelineId</h4>';
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
    let pipelineDataTableDiv = document.getElementById("opportunity");
    pipelineDataTableDiv.innerHTML = pipelineTableHtml;
}

const handleDelete = (opportunityId, action) => {
    if (confirm("Are you sure you want to delete this opportunity?")) {
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
                    location.reload();
                } else {
                    console.error('Error deleting opportunity:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting opportunity:', error);
            });
    }
}
document.addEventListener('DOMContentLoaded',
    showAllOpportunity());


function openForm() {
    var form = document.getElementById("opportunityForm");
    form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";

}

let opportunityform = document.getElementById("opportunityForm");
opportunityform.addEventListener('submit', (event) => {
    event.preventDefault()
    var formData = {};
    for (var i = 0; i < inputElements.length; i++) {
        var input = inputElements[i];
        formData[input.name] = input.value;
    }
    console.log(formData, 'formdata');
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


//filter table of opportunity

let filteropportunity = document.getElementById("filteropportunity")
filteropportunity.addEventListener('submit',(event) =>{
    event.preventDefault()   
    const input1 = document.getElementById('startAfterId') 
    const input2 = document.getElementById('startAfter') 
    console.log(input1,input2 ,'kkkk')
    fetch(`https://rest.gohighlevel.com/v1/pipelines/imlbJBF3KSozhf9IVV7y/opportunities?startAfterId=${input1}&startAfter=${input2}&limit=20`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log('filterdata',data)
            showData(data.contacts)
                email = '' 
        })
        .catch(error => {
            console.error('Error fetching contact appointments:', error);
        });    
}) 
