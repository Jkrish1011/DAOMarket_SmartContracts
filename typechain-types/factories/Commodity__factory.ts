/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Commodity, CommodityInterface } from "../Commodity";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "registryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "ValueChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516104d23803806104d283398101604081905261002f916100ad565b6100383361005d565b600180546001600160a01b0319166001600160a01b03929092169190911790556100dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100bf57600080fd5b81516001600160a01b03811681146100d657600080fd5b9392505050565b6103e6806100ec6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632e64cec1146100675780636057361d1461007d578063715018a61461009257806382ab890a1461009a5780638da5cb5b146100ad578063f2fde38b146100c8575b600080fd5b6002546040519081526020015b60405180910390f35b61009061008b366004610332565b6100db565b005b6100906101ae565b6100906100a8366004610332565b6101e4565b6000546040516001600160a01b039091168152602001610074565b6100906100d636600461034b565b610247565b6000546001600160a01b0316331461010e5760405162461bcd60e51b81526004016101059061037b565b60405180910390fd5b6002819055600154604051630554099760e41b8152600481018390526001600160a01b03909116906355409970906024015b600060405180830381600087803b15801561015a57600080fd5b505af115801561016e573d6000803e3d6000fd5b505050507f93fe6d397c74fdf1402a8b72e47b68512f0510d7b98a4bc4cbdf6ac7108b3c59816040516101a391815260200190565b60405180910390a150565b6000546001600160a01b031633146101d85760405162461bcd60e51b81526004016101059061037b565b6101e260006102e2565b565b6000546001600160a01b0316331461020e5760405162461bcd60e51b81526004016101059061037b565b60028190556001546040516001627a473760e11b03198152600481018390526001600160a01b039091169063ff0b719290602401610140565b6000546001600160a01b031633146102715760405162461bcd60e51b81526004016101059061037b565b6001600160a01b0381166102d65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610105565b6102df816102e2565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561034457600080fd5b5035919050565b60006020828403121561035d57600080fd5b81356001600160a01b038116811461037457600080fd5b9392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260408201526060019056fea2646970667358221220d4c048154587f209158ea60c6b67f524de52fa8d3eaa3ab32274e4b2bb25d92164736f6c63430008090033";

type CommodityConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CommodityConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Commodity__factory extends ContractFactory {
  constructor(...args: CommodityConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Commodity";
  }

  deploy(
    registryAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Commodity> {
    return super.deploy(registryAddress, overrides || {}) as Promise<Commodity>;
  }
  getDeployTransaction(
    registryAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(registryAddress, overrides || {});
  }
  attach(address: string): Commodity {
    return super.attach(address) as Commodity;
  }
  connect(signer: Signer): Commodity__factory {
    return super.connect(signer) as Commodity__factory;
  }
  static readonly contractName: "Commodity";
  public readonly contractName: "Commodity";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CommodityInterface {
    return new utils.Interface(_abi) as CommodityInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Commodity {
    return new Contract(address, _abi, signerOrProvider) as Commodity;
  }
}
