// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
//import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import contractDonaciones_artifacts from '../../build/contracts/ContractDonaciones.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
//var MetaCoin = contract(metacoin_artifacts);
var ContractDonaciones = contract(contractDonaciones_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    ContractDonaciones.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      //self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

   callOracle: function() {
    console.log("callOracle");
    var self = this;
    var meta;
    

    ContractDonaciones.deployed().then(function (instance) {
      console.log("instance");
      console.log(instance);

      meta = instance;
      console.log('entro');
      return meta.confirmarDonacion(account, {from: account});
    }).then(function(value) {
      console.log('entro lal');
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
    console.log('si algo');
    
  },

  mostrarONG: function() {
    console.log("mostrar ONG");
    var self = this;
    var meta;
    

    ContractDonaciones.deployed().then(function (instance) {
      console.log("instance");
      console.log(instance);

      meta = instance;
      console.log('entro');
      return meta.getONG('0xf17f52151ebef6c7334fad080c5704d77216b732');
    }).then(function(value) {
      console.log('ongggg');
      console.log(value); // lo del return
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
    console.log('si algo');
    
  },

  createONG: function() {
    console.log("crear ONG");
    var self = this;
    var meta;
    

    ContractDonaciones.deployed().then(function (instance) {
      console.log("instance");
      console.log(instance);

      meta = instance;
      console.log('entro'); 
      var ongName = document.getElementById("NombreONG").value;
      var ongMision = document.getElementById("Mision").value;
      var ongVision = document.getElementById("Vision").value;
      var ongObjective = document.getElementById("Objetivo").value;
      return meta.addONG(ongName, ongMision, ongVision, ongObjective, {from: account, gas: 2000000});
    }).then(function(value) {
      console.log('daaa');
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
    console.log('si algo');
    
  },

  createDonator: function() {
    var balance_element = document.getElementById("balance");
    var self = this;

    var nombre = parseInt(document.getElementById("nombre").value);
   

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    console.log('jaaaaaaaaaaaaaa');
    ContractDonaciones.deployed().then(function(instance) {
      console.log('jeeeeeeeeeeee');
      meta = instance;
      console.log(meta);
      return meta.addDonator(nombre);
    }).then(function() {

      balance_element.innerHTML = 'jajaj';
      //self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      balance_element.innerHTML = 'jaj';
    });
    
  },
  sendDonation: function() {
    
  },
};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
