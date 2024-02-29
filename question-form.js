const formChoice = document.getElementById("formChoice");
const v1Elements = document.querySelectorAll(".hidden-for-v1");
const paragraph = document.getElementById('paragraph');
paragraph.required = true;

async function uploadImage(imageFile) {
    if(!imageFile) return '';
    try {
      const ref = firebase.storage().ref();
      const name = +new Date() + '-' + imageFile.name;
      const metadata = {
        contentType: imageFile.type,
      };
  
      const snapshot = await ref.child(`questionImages/${name}`).put(imageFile, metadata);
      const url = await snapshot.ref.getDownloadURL();
      
      console.log('Uploaded image URL:', url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

async function uploadImages(imageFiles) {
    const uploadedImageUrls = [];

    for (const imageFile of imageFiles) {
        const imageUrl = await uploadImage(imageFile);
        uploadedImageUrls.push(imageUrl);
    }

    return uploadedImageUrls;
}  

formChoice.addEventListener("change", function () {
    if (formChoice.value === "v1") {
        paragraph.required = false;
        v1Elements.forEach((element) => {
            element.style.display = "none";
        });
    } else if (formChoice.value === "v2") {
        paragraph.required = true;
        v1Elements.forEach((element) => {
            element.style.display = "block";
        });
    }
});

function toggleTopicDiv() {
    var subject = document.getElementById("subject").value;
    var topicDivMath = document.querySelector(".math");
    var topicDivDI = document.querySelector(".di");
    var topicDivLR = document.querySelector(".lr");
    var topicDivVARC= document.querySelector(".varc");

    topicDivMath.style.display = "none";
    topicDivDI.style.display = "none";
    topicDivLR.style.display = "none";
    topicDivVARC.style.display = "none";

    if (subject === "math") {
        topicDivMath.style.display = "block";
    } else if (subject === "di") {
        topicDivDI.style.display = "block";
    } else if (subject === "lr"){
        topicDivLR.style.display = "block";
    }
    else if (subject === "varc") {
        topicDivVARC. style.display = "block";
    }

}

toggleTopicDiv();

let questionCount = 1;
let optionCounts = [5];

function addQuestion() {
    questionCount++;
    optionCounts.push(5);

    const questionForm = document.getElementById("questions");

    const questionDiv = document.createElement("div");
    questionDiv.className = "question-container";

    questionDiv.innerHTML = `
        <h2>Question ${questionCount}</h2>

            <label for="questionText${questionCount}">Question Text:</label>
            <textarea id="questionText${questionCount}" name="questions[${questionCount}].text" rows="5" cols="80" required></textarea>


            <label for="questionImages${questionCount}">Upload Question Images:</label>
            <input type="file" id="questionImages${questionCount}" name="questions[${questionCount}].images" accept="image/*" multiple>


            <label for="questionDifficulty${questionCount}">Question Difficulty:</label>
            <select id="questionDifficulty${questionCount}" name="questions[${questionCount}].difficulty">
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
            </select>



            <h3>Options</h3>
            <div id="question-${questionCount}" class="question-options">
                <div class="option-container">
                    <label for="optionText${questionCount}_1">Option 1 Text:</label>
                    <input type="text" id="optionText${questionCount}_1" name="questions[${questionCount}].options[1].text" required>
                    <label for="optionImage${questionCount}_1">Option 1 Image:</label>
                    <input type="file" id="optionImage${questionCount}_1" name="questions[${questionCount}].options[1].image" accept="image/*">
                </div>

                <div class="option-container">
                    <label for="optionText${questionCount}_2">Option 2 Text:</label>
                    <input type="text" id="optionText${questionCount}_2" name="questions[${questionCount}].options[2].text" required>
                    <label for="optionImage${questionCount}_2">Option 2 Image:</label>
                    <input type="file" id="optionImage${questionCount}_2" name="questions[${questionCount}].options[2].image" accept="image/*">
                </div>

                <div class="option-container">
                    <label for="optionText${questionCount}_3">Option 3 Text:</label>
                    <input type="text" id="optionText${questionCount}_3" name="questions[${questionCount}].options[3].text" required>
                    <label for="optionImage${questionCount}_3">Option 3 Image:</label>
                    <input type="file" id="optionImage${questionCount}_3" name="questions[${questionCount}].options[3].image" accept="image/*">
                </div>

                <div class="option-container">
                    <label for="optionText${questionCount}_4">Option 4 Text:</label>
                    <input type="text" id="optionText${questionCount}_4" name="questions[${questionCount}].options[4].text" required>
                    <label for="optionImage${questionCount}_4">Option 4 Image:</label>
                    <input type="file" id="optionImage${questionCount}_4" name="questions[${questionCount}].options[4].image" accept="image/*">
                </div>

            </div>
            <label for="correctOptionIndex${questionCount}">Correct Option Index:</label>
            <input type="number" id="correctOptionIndex${questionCount}" name="questions[${questionCount}].correctOptionIndex" required>

            <label for="explanation${questionCount}">Explanation: </label>
            <textarea id="explanation${questionCount}" name="explanation${questionCount}" rows="5" cols="80" required></textarea>
            
            <label for="explanation${questionCount}images">Upload Explanation Images:</label>
            <input type="file" id="explanation${questionCount}images" name="explanation${questionCount}images" accept="image/*" multiple>

            <button type="button" onclick="addOption(${questionCount})">Add Option</button>

    `;

    questionForm.appendChild(questionDiv);
}

function addOption(questionIndex) {
    const optionCount = optionCounts[questionIndex-1]++;
    console.log("chekcing", optionCount, questionIndex);
    const optionDiv = document.getElementById(`question-${questionIndex}`);
    const newOption = document.createElement("div");
    newOption.className = "option-container";

    newOption.innerHTML = `
        <label for="optionText${questionIndex}_${optionCount}">Option ${optionCount} Text:</label>
        <input type="text" id="optionText${questionIndex}_${optionCount}" name="questions[${questionIndex}].options[${optionCount}].text" required>
        <label for="optionImage${questionIndex}_${optionCount}">Option ${optionCount} Image:</label>
        <input type="file" id="optionImage${questionIndex}_${optionCount}" name="questions[${questionIndex}].options[${optionCount}].image" accept="image/*">
    `;

    optionDiv.appendChild(newOption);
}

function resetForm() {
    location.reload();
}


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('question-form');
    const submitButton = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async function (event) {
        console.log('submit is cliked Dont do anything wait for the upload');
        event.preventDefault(); 

        const subject = document.getElementById('subject').value;
        let version = document.getElementById('formChoice').value;
        if(version === "v1"){
            version = "v2";
        }else{
            version = "v1";
        }
           
          
        let questions = [];

        const totalQuestions = document.querySelectorAll('.question-container').length;
        for (let questionIndex = 1; questionIndex <= totalQuestions; questionIndex++) { 
            const questionData = {
                text: document.getElementById(`questionText${questionIndex}`).value.split('\n'),
                images: await uploadImages(document.getElementById(`questionImages${questionIndex}`).files),
                difficulty: document.getElementById(`questionDifficulty${questionIndex}`).value,
                explanation: {
                    text: document.getElementById(`explanation${questionIndex}`).value.split('\n'),
                    images: await uploadImages(document.getElementById(`explanation${questionIndex}images`).files)
                },
                correctOptionIndex: document.getElementById(`correctOptionIndex${questionIndex}`).value,
                options: []
            };
    
            for (let optionIndex = 1; optionIndex < optionCounts[questionIndex-1]; optionIndex++) { 
                const optionData = {
                    text: document.getElementById(`optionText${questionIndex}_${optionIndex}`).value,
                    image: await uploadImage(document.getElementById(`optionImage${questionIndex}_${optionIndex}`).files[0])
                };
                questionData.options.push(optionData);
            }
            questions.push(questionData);
        }
        
        let formData;
        const selectElement = document.getElementById('entranceExams');
        const entranceExams = Array.from(selectElement.selectedOptions).map(option => option.value);
        
        if(formChoice.value === "v2"){
            formData = {
                paragraph: document.getElementById('paragraph').value.split('\n'),
                images: await uploadImages(document.getElementById('paragraphImages').files),
                questions: questions,
                difficulty: document.getElementById('difficulty').value,
                topic: document.getElementById(`${subject}`).value,
                subTopic: document.getElementById('subTopic').value,
                entrance_exams: entranceExams,
            };
        }
        else{
            formData = {
                ...questions[0],
                topic: document.getElementById(`${subject}`).value,
                subTopic: document.getElementById('subTopic').value,
                entrance_exams: entranceExams,
            }
        }
    
    const apiEndpoint = `https://ourntamockpapers.onrender.com/api/${subject}/question/${version}`;
    console.log("checking final data", formData, apiEndpoint);
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data);
        })
        .catch(error => {
            console.error('API error:', error);
        });
    });
});