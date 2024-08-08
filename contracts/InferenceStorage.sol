// SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// contract InferenceStorage {
//     struct MsgSubmitInference {
//         uint64 deploymentId;
//         bytes request;
//         address sender;
//     }

//     // Mapping from a unique ID to MsgSubmitInference struct
//     mapping(uint256 => MsgSubmitInference) private inferences;

//     // Event to log the submission of an inference
//     event InferenceSubmitted(uint256 indexed id, uint64 deploymentId, bytes request, address sender);

//     // Function to submit an inference
//     function submitInference(uint256 id, uint64 deploymentId, bytes memory request) public {
//         require(inferences[id].sender == address(0), "Inference with this ID already exists");

//         MsgSubmitInference memory newInference = MsgSubmitInference({
//             deploymentId: deploymentId,
//             request: request,
//             sender: msg.sender
//         });

//         inferences[id] = newInference;

//         emit InferenceSubmitted(id, deploymentId, request, msg.sender);
//     }

//     // Function to get an inference by its ID
//     function getInference(uint256 id) public view returns (uint64, bytes memory, address) {
//         MsgSubmitInference memory inference = inferences[id];
//         require(inference.sender != address(0), "Inference with this ID does not exist");

//         return (inference.deploymentId, inference.request, inference.sender);
//     }
// }

// pragma solidity ^0.8.0;

// contract InferenceStorage {
//     // Event to log the submission of an inference
//     event InferenceSubmitted(uint64 deploymentId, string request, address sender);

//     // Function to submit an inference
//     function submitInference(uint64 deploymentId, string memory request) public {
//         // Emit the event instead of storing the inference
//         emit InferenceSubmitted(deploymentId, request, msg.sender);
//     }
// }
pragma solidity ^0.8.0;

contract InferenceStorage {
    // Event to log the submission of an inference
    event InferenceSubmitted(uint64 deploymentId, string request, address sender);

    // Event to log the storage of an inference
    event InferenceStored(uint64 id, string request, string result, uint64 deploymentId, string creator);

    // Struct to hold inference data
    struct Inference {
        uint64 id;
        string request;
        string result;
        uint64 deploymentId;
        string creator;
        string createdAt;
        uint8 status;
    }

    // Mapping to store inferences by their ID
    mapping(uint64 => Inference) public inferences;

    // Function to submit an inference (event only, no storage)
    function submitInference(uint64 deploymentId, string memory request) public {
        emit InferenceSubmitted(deploymentId, request, msg.sender);
    }

    // Function to store an inference from Cosmos chain
    function storeInference(
        uint64 id,
        string memory request,
        string memory result,
        uint64 deploymentId,
        string memory creator,
        string memory createdAt,
        uint8 status
    ) public {
        // Store the inference in the mapping
        inferences[id] = Inference(id, request, result, deploymentId, creator, createdAt, status);

        // Emit the event
        emit InferenceStored(id, request, result, deploymentId, creator);
    }

    // Function to get an inference by its ID
    function getInferenceValue(uint64 id) public view returns (Inference memory) {
        return inferences[id];
    }
}