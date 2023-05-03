// SPDX-License-Identifier: MIT

// Pragma
pragma solidity ^0.8.7;

contract BuyMeCoffee{


    event NewMemo(address indexed from,uint256 timestamp,string  name,string  message);

    struct Memo{
        address from;
        uint256 timestamp;
        string  name;
        string message;
    }

   
    Memo[] memos;
    address payable immutable i_owner;

    constructor(){
        i_owner=payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "NOT_OWNER");
        _;
    }

    function buyCoffee(string memory _name,string memory _message)payable public {
        require(msg.value>0,"Not enough Monney");
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message

        ));
         emit NewMemo(msg.sender,block.timestamp,_name,_message);                        
    }

    function withDrawTips() public onlyOwner {
        (bool sucess,)=payable(msg.sender).call{value:address(this).balance}("");
        require(sucess,"withraw failed");
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;

    }

}