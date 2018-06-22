//explanation  https://github.com/trufflesuite/trufflesuite.com/blob/master/public/tutorials/pet-shop.md
//https://truffleframework.com/tutorials/pet-shop

//https://github.com/imthatcarlos/pet-shop-dapp

//https://github.com/trufflesuite/trufflesuite.com/blob/master/public/tutorials/pet-shop.md



App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {

       //check if web3 is already provided in the browser
       // 

       if(typeof web3 !== "undefined") {
         App.web3Provider = web3.currentProvider;
          } else {
            //if not i create a new instance of web3

            App.web3provider = new Web3.providers.Httpprovider('http://localhost:8545');
            }
        
      web3 = new Web3(App.web3Provider);
      
    return App.initContract();
      

   
  },

  //contract initialization
  initContract: function() {
      $.getJSON('Adoption.json', function (data) {

        //get adoption artifact and create a truffle contract

        var AdoptionArtifacthttps://truffleframework.com/tutorials/pet-shop
        App.contracts.Adoptihttps://truffleframework.com/tutorials/pet-shopAdoptionArtifact);
        App.contracts.Adoptihttps://truffleframework.com/tutorials/pet-shopb3Provider);
        //?  what does markAhttps://truffleframework.com/tutorials/pet-shop
        return App.markAdopthttps://truffleframework.com/tutorials/pet-shop
      })

    return App.bindEvents();https://truffleframework.com/tutorials/pet-shop
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  //reads the smart contract and updates an UI
  markAdopted: function(adopters, account) {
       var adoptionInstance
       App.contracts.Adoption.deployed().then(function(instance){
        //get deployedInstance of adoption contract
        adoptionInstance = instance;

        //get the list of adopters
        return adoptionInstance.getAdopters.call();
      }).then(function(adopterhttps://truffleframework.com/tutorials/pet-shops) {

          //iterate through the list of adopters
          for (var i = 0; i < adopters.length; i++) {
              if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);
              }

          }
        }).catch(function(err){
         
          console.log(err.message)

      });
        
                   
  },

  //this function is called if someone wants to adopt 
  //the pet (click button)

  handleAdopt: function(event) {
    event.preventDefault();
    //data store arbitrary data associated 
    //with the matched elements or return the value at the named data store for the first element in the set of matched elements.
    
    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance 

    web3.eth.getAccounts(function(err, accounts){
          if(err)  console.log(err)
          var account =accounts[0];

          App.contracts.Adoption.deployed().then(function(instance)
          { adoptionInstance = instance
            return adoptionInstance.adopt(petId, {from: account})
          }).then(function(result){
             return App.markAdopted()
          }).catch(function(err){
             console.log(err.message)

          })

      })


  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
