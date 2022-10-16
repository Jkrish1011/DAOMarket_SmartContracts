// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IRegistry {
    function addCommodityValue(uint256 value) external;
    function updateCommodityValue(uint256 newValue) external;

    function hasAttribute(address account, uint256 attributeTypeID)
        external
        view
        returns (bool);

    function getAttributeValue(address account, uint256 attributeTypeID)
        external
        view
        returns (uint256);
    function countAttributeTypes() external view returns (uint256);
    function getAttributeTypeID(uint256 index) external view returns (uint256);
}

contract Commodity is Ownable {
  address private _registryAddress;
  uint256 private _value;

  // Emitted when the stored value changes
  event ValueChanged(uint256 newValue);

  constructor(address registryAddress) {
    _registryAddress = registryAddress;
  }

  // Stores a new value in the contract
  function store(uint256 value) public onlyOwner {
    _value = value;
    IRegistry(_registryAddress).addCommodityValue(_value);
    emit ValueChanged(value);
  }

  function update(uint256 newValue) public onlyOwner {
    _value = newValue;
    IRegistry(_registryAddress).updateCommodityValue(newValue);
    emit ValueChanged(newValue);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
    return _value;
  }
}
