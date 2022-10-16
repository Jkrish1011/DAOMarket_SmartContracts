//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/ERC1616.sol";

contract Registry is ERC1616 {
    enum Affiliation { CommodityValue }

    // Top-level information about attribute types held in a static array.
    uint256[1] private _attributeTypeIDs;

    // Issued attributes held in a nested mapping by account & attribute type.
    mapping(address => mapping(uint256 => bool)) private _issuedAttributes;

    event SenderAddress(address senderAddr);

    // Issued attribute values held in a nested mapping by account & type.
    // uint256[2] = [PastValue, PresentValue]
    mapping(address => mapping(uint256 => uint256[2]))
        private _issuedAttributeValues;

    constructor() {
        _attributeTypeIDs = [0];
    }

    function addCommodityValue(uint256 value) external {
        uint256 commodityValueValueIndex = uint256(Affiliation.CommodityValue);
        // uint256 presentValueIndex = uint256(Affiliation.PresentValue);
        
        uint256 presentAttributeTypeID = _attributeTypeIDs[commodityValueValueIndex];

        _issuedAttributes[msg.sender][presentAttributeTypeID] = true;

        _issuedAttributeValues[msg.sender][presentAttributeTypeID] = [value, value];
        emit SenderAddress(msg.sender);
    }

    function updateCommodityValue(uint256 newValue) external {
        uint256 commodityValueValueIndex = uint256(Affiliation.CommodityValue);
        // uint256 presentValueIndex = uint256(Affiliation.PresentValue);
        
        uint256 presentAttributeTypeID = _attributeTypeIDs[commodityValueValueIndex];

        _issuedAttributes[msg.sender][presentAttributeTypeID] = true;
        uint256 currentPresentValue = _issuedAttributeValues[msg.sender][presentAttributeTypeID][1];
        _issuedAttributeValues[msg.sender][presentAttributeTypeID] = [currentPresentValue, newValue];
    }

    /**
     * @notice Check if an attribute of the type with ID `attributeTypeID` has
     * been assigned to the account at `account` and is currently valid.
     * @param account address The account to check for a valid attribute.
     * @param attributeTypeID uint256 The ID of the attribute type to check for.
     * @return True if the attribute is assigned and valid, false otherwise.
     * @dev This function MUST return either true or false - i.e. calling this
     * function MUST NOT cause the caller to revert.
     */
    function hasAttribute(address account, uint256 attributeTypeID)
        external
        view
        returns (bool)
    {
        // Return assignment status of attribute by account and attribute type ID
        return _issuedAttributes[account][attributeTypeID];
    }

    /*
     * @notice Retrieve the value of the attribute of the type with ID
     * `attributeTypeID` on the account at `account`, assuming it is valid.
     * @param account address The account to check for the given attribute value.
     * @param attributeTypeID uint256 The ID of the attribute type to check for.
     * @return The attribute value if the attribute is valid, reverts otherwise.
     * @dev This function MUST revert if a directly preceding or subsequent
     * function call to `hasAttribute` with identical `account` and
     * `attributeTypeID` parameters would return false.
     */
    function getAttributeValue(address account, uint256 attributeTypeID)
        external
        view
        returns (uint256[2] memory)
    {
        // Revert if attribute with given account & attribute type ID is unassigned
        require(
            _issuedAttributes[account][attributeTypeID],
            "Attribute type ID not found!"
        );
        uint256[2] memory returnValue = _issuedAttributeValues[account][attributeTypeID];
        return returnValue;
    }

    /**
     * @notice Count the number of attribute types defined by the registry.
     * @return The number of available attribute types.
     * @dev This function MUST return a positive integer value  - i.e. calling
     * this function MUST NOT cause the caller to revert.
     */
    function countAttributeTypes() external view returns (uint256) {
        return _attributeTypeIDs.length;
    }

    /**
     * @notice Get the ID of the attribute type at index `index`.
     * @param index uint256 The index of the attribute type in question.
     * @return The ID of the attribute type.
     * @dev This function MUST revert if the provided `index` value falls outside
     * of the range of the value returned from a directly preceding or subsequent
     * function call to `countAttributeTypes`. It MUST NOT revert if the provided
     * `index` value falls inside said range.
     */
    function getAttributeTypeID(uint256 index) external view returns (uint256) {
        require(
            index < _attributeTypeIDs.length,
            "Index Out of Bound!"
        );

        return _attributeTypeIDs[index];
    }
}
