pragma solidity ^0.4.17;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract ContractDonaciones {

struct DateTimeCreation {
        uint16 year;
        uint8 month;
        uint8 day;
	}

	struct ONG{
		address addr;
		string nombre;
		string mision;
		string vision;
		int objective;
		int actualBalance;
		//DateTimeCreation creationDate;
		bool exists;
		mapping(address=>Donator) donatorsOfONG;
	}

	struct Donator{
		address addr;
		string nombre;
		bool exists;
	}

	mapping (string=> address) ONGnames;
	mapping (address=> ONG) ONGs;
	mapping(address => Donator) donators;

	event checkAdvances (address _addressONG);

	function addDonator(string _nombre) public returns (bool){
		bool donatorAdded;
		if(!donators[msg.sender].exists) {
			donators[msg.sender].nombre = _nombre;
			donators[msg.sender].exists=true;
			donators[msg.sender].addr=msg.sender;
			donatorAdded=true;
		}

		else{
			donatorAdded=false; 
		}	
		return donatorAdded;	
	}

	function addONG(string _nombre, string _vision, string _mision, int _objective) public returns (bool){
		bool ONGAdded;
		if(!ONGs[msg.sender].exists) {
			ONGs[msg.sender].nombre = _nombre;
			ONGs[msg.sender].exists=true;
			ONGs[msg.sender].addr=msg.sender;
			ONGs[msg.sender].vision = _vision;
			ONGs[msg.sender].mision=_mision;
			ONGs[msg.sender].objective=_objective;
			//ONGs[msg.sender].creationDate=_creationDate;
			ONGnames[_nombre]=msg.sender;
			ONGAdded=true;
		}

		else{
			ONGAdded=false; 
		}		
	}

	function donation(address _addressONG) public payable{
		if(msg.sender.balance >= msg.value ){
						 //las variables se actualizan en el contrato o en la js? 
												 //como funciona el oracle? como se intercambia informacion con el contrato?
												 //como intercambio informacion, con la innterfaz grafica?
												 //metamask, como trabajamos con las direcciones de ganache?

		}



	}
}
