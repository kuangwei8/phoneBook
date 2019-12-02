//business logic

class AddressBook{
  constructor(){
    this.contacts = [];
    this.currentId = 0; 
  }
  assignId(){
    this.currentId += 1; 
    return this.currentId; 
  }

  addContact(contact){
    contact.id = this.assignId(); 
    this.contacts.push(contact); 
  }

  findContact(id){
    for(let i = 0; i < this.contacts.length; i++){
      if(this.contacts[i]){
        if(this.contacts[i].id == id){
          return this.contacts[i]; 
        }
      }
    }
     return false; 
  }

  deleteContact(id){
    for(let i = 0; i < this.contacts.length; i++){
      if(this.contacts[i]){
        if(this.contacts[i].id == id){
          delete this.contacts[i]; 
          return true; 
        }
      }
    }
    return false; 
  }
}

class Contact{
  constructor(firstName, lastName, phoneNumber){
    this.firstName = firstName; 
    this.lastName = lastName; 
    this.phoneNumber = phoneNumber; 
  }

}

// user interface logic

const addressBook = new AddressBook(); 

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId){
  const contact = addressBook.findContact(contactId)
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
  
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})





