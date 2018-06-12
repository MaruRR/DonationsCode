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
		uint actualBalance;
		//DateTimeCreation creationDate;
		bool exists;
		mapping(address=>Donator) donatorsOfONG;
	}

	struct Donator{
		address addr;
		string nombre;
		bool exists;
		DateTimeCreation FechaNacimiento;
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

	function getONG(address _addressONG) public view returns (string _nombre, string _vision, string _mision, int _objective, uint _balance){
		_nombre = ONGs[_addressONG].nombre;
		_vision = ONGs[_addressONG].vision;
		_mision = ONGs[_addressONG].mision;
		_objective = ONGs[_addressONG].objective;
		_balance = ONGs[_addressONG].actualBalance;
		return( _nombre,  _vision,  _mision,  _objective,  _balance);
	}


	function donation(address _addressONG) public payable {
			//address(this).transfer(msg.value);
		require(msg.value > 0);
		require(ONGs[_addressONG].exists);
		ONGs[_addressONG].actualBalance= ONGs[_addressONG].actualBalance + msg.value;	
	}

	function confirmarDonacion(address _ong) public payable {

	}
}
