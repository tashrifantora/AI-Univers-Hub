const loadData = (isClicked) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools, isClicked));
};

// Display data
const displayData = (datas, isClicked) => {
  const cardContainer = document.getElementById("card-container");

  //Logic for[Sww more] button will show ore note
  const showAllBtn = document.getElementById("showAllBtn");
  if (datas.length > 6) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
  if (!isClicked) {
    //Logic for Show all element
    datas = datas.slice(0, 6);
  }

  datas.forEach((data) => {
    // console.log(data);
    const card = document.createElement("div");
    card.classList = `card w-96 bg-base-100 shadow-xl mb-7`;
    card.innerHTML = `
        
                    <figure class="px-10 pt-10">
                      <img src="${data.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-left text-left">
                    <h1 class="text-2xl font-bold">Features</h1>

                      <ol class="mb-3 list-decimal">
                         <li>${data.features[0]}
                         </li>                      
                         <li>${data.features[1]}
                         </li>                      
                         <li>${data.features[2]}
                         </li>                      
                      </ol>

                      <hr class="mb-3">
                     <div class="flex justify-between items-center ">
                      <div>
                           <p class="mb-2 text-xl font-semibold">${data.name}</p>
                          <p><span><i class="fa-regular fa-calendar-days"></i> </span>11/5/2003</p>
                      </div>
                         <i onclick="handleSingleData('${data.id}')" class="fa-solid fa-arrow-right rounded-full bg-red-50 p-3"></i>
                    </div>
                    </div>
                  
        `;
    cardContainer.appendChild(card);
  });
};

//For single details
const handleSingleData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  .then(res=> res.json())
  .then(data=>singleDataDetails(data.data));

};

const singleDataDetails=(info)=>{
  console.log(info);
  
	const modalContiner = document.getElementById('modal-continer');

  // Clear the modal
  modalContiner.textContent='';

  const modalDiv= document.createElement('div');
  modalDiv.innerHTML=`
  <div class="flex-row lg:flex justify-between gap-3 ">
					<div class="bg-red-100 rounded-lg  flex-1 mb-6">
						<div class="card  ">
							<div class="card-body  text-left">
								<h1 class="text-xl font-bold mb-4">${info.description}
								</h1>
								<div class="flex-row lg:flex justify-between gap-5 mb-4">
									<p class="bg-[#FFF] px-2 py-2 text-orange-500 text-lg font-medium rounded-lg flex lg:items-center justify-center mb-2">${info.pricing[0].price}<br>${info.pricing[0].plan}</p>
									<p class="bg-[#FFF] px-2 py-2 text-green-700 text-lg font-medium rounded-lg flex lg:items-center justify-center mb-2">${info.pricing[1].price}<br>${info.pricing[1].plan}</p>

									<p class="bg-[#FFF] px-2 py-2 text-red-500 text-lg font-medium rounded-lg flex lg:items-center justify-center">${info.pricing[2].price}<br>${info.pricing[2].plan}</p>
								</div>
								<div class="flex-row md:flex justify-between px-5">
									<div>
										<h3 class="text-lg font-medium">Features</h3>
										<ul class="list-disc">
											<li>${info.features['1'].feature_name}</li>
											<li>${info.features['2'].feature_name}</li>
											<li>${info.features['3'].feature_name}</li>
										</ul>
									</div>
									<div>
										<h3 class="text-lg font-medium">Integrations</h3>
										<ul class="list-disc">
											<li>${info.integrations[0]}</li>
											<li>${info.integrations[1]}</li>
											<li>${info.integrations[2]}</li>
										</ul>
									</div>
								</div>

							</div>
						</div>
					</div>


					<div class="flex-1">
						<div class="card bg-base-100 border">
							<figure class="px-10 pt-10">
								<img src="${info.image_link[0]}"
									alt="Shoes" class="rounded-xl" />
							</figure>
							<div class="card-body items-center text-center">
								<h2 class="card-title">${info.input_output_examples[0].input}</h2>
								<p>${info.input_output_examples[1].input}</p>
							</div>
						</div>

					</div>
				</div>
				<div class="modal-action">
					<!-- if there is a button, it will close the modal -->
					<button class="btn rounded-md">Close</button>
				</div>
  `
  modalContiner.appendChild(modalDiv);



	//Modals
	single_data_modal.showModal();
}

//Show All Button
const handleShowAll = () => {
  loadData(true);   





};

loadData();
