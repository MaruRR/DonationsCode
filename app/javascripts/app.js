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
    var dir = document.getElementById('DirONGBuscar').value;
    console.log("mostrar ONG + " + dir);
    var self = this;
    var meta;
    

    ContractDonaciones.deployed().then(function (instance) {
      console.log("instance");
      console.log(instance);

      meta = instance;
      console.log('entro');
      return meta.getONG(dir);
    }).then(function(value) {
      console.log('ongggg');
      console.log(value); // lo del return
      var valor = document.getElementById("NombreONGBuscar");
      valor.innerHTML = value[0].valueOf();
      valor = document.getElementById("MisionONGBuscar");
      valor.innerHTML = value[1].valueOf();
      valor = document.getElementById("VisionONGBuscar");
      valor.innerHTML = value[2].valueOf();
      valor = document.getElementById("ObjetivoONGBuscar");
      valor.innerHTML = value[3].c.valueOf();
      valor = document.getElementById("BalanceONGBuscar");
      valor.innerHTML = value[4].c.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
    console.log('si algo');
    
  },

  mostrarDonador: function() {
    var dir = document.getElementById('DirDonadorBuscar').value;
    console.log("mostrar Donador + " + dir);
    var self = this;
    var meta;
    
    ContractDonaciones.deployed().then(function (instance) {
      console.log("instance");
      console.log(instance);

      meta = instance;
      console.log('entro');
      return meta.getDonator(dir);
    }).then(function(value) {
      console.log('donaaaaaaaaatorrrr');
      console.log(value); // lo del return
      var valor = document.getElementById("NombreDonadorBuscar");
      valor.innerHTML = value[0].valueOf();
      valor = document.getElementById("ApellidoDonadorBuscar");
      valor.innerHTML = value[1].valueOf();
      valor = document.getElementById("CIDonadorBuscar");
      valor.innerHTML = value[2].valueOf();
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
    var meta;
    //var balance_element = document.getElementById("balance");
    var self = this;

    var CI = document.getElementById("ci").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;

    ContractDonaciones.deployed().then(function (instance) {
      console.log("instance");
      console.log(instance);

      meta = instance;
      console.log('entro'); 
      return meta.addDonator(CI, nombre, apellido, {from: account, gas: 2000000});
    }).then(function(value) {
      console.log('daaa');
    }).catch(function(e) {
      console.log(e);
      console.log('ERRRORRRR');
    });
    console.log('si algo');
    
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
