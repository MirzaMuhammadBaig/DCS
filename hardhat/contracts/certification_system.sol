// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Certification System Smart Contract
 * @dev This smart contract allows providers to issue certifications to users for specific courses.
 */
contract certification_system is Ownable {
    //Enum
    enum user_status {
        NotCertified,
        Certified
    }

    struct providers_data {
        string providerName;
        string instituteName;
        address providerAddress;
        uint256 certificate_counts;
    }

    struct provider_certificate_data {
        string course_name;
        string institute_name;
        string provider_name;
        address provider_address;
        string[] skills;
    }

    struct certificate_detail {
        uint256 issue_date;
        string course_name;
        string course_length;
        string[] skills;
        string certificate_url;
        string[] instructors_names;
    }

    struct fix_certificate_detail {
        string candidiate_name;
        string providerName;
        string instituteName;
        uint256 user_id;
        address taker_address;
        address giver_address;
        user_status _user_status;
    }

    struct user_certified_send_data {
        string course_name;
        string certificate_url;
        user_status _user_status;
    }

    struct invitations_data {
        address sended_address;
        string course_name;
        string certificate_url;
    }

    struct user_register_data {
        address user_address;
        string user_name;
        uint256 user_id;
    }

    //Variables
    string[] private skills;
    string[] private certifications;
    uint256 private user_registered_count;

    // Mappings
    mapping(address => provider_certificate_data[])
        private provider_certificates_details;
    mapping(address => providers_data) private providers_details;
    mapping(address => user_register_data) private check_user_register_data;
    mapping(address => certificate_detail[]) private userCertificates;
    mapping(address => fix_certificate_detail) private fixUserCertificates;
    mapping(address => mapping(string => user_certified_send_data))
        private _is_user_certified;
    mapping(address => mapping(string => provider_certificate_data))
        private course_Names_skills;
    mapping(address => invitations_data[]) private certificateInvitations;

    // Events
    event CertificateIssued(
        address indexed takerAddress,
        address indexed giverAddress,
        string courseName,
        string certificateUrl
    );
    event CertificateSend(
        address indexed takerAddress,
        address indexed giverAddress,
        string courseName,
        string certificateUrl
    );
    event InvitationSent(
        address indexed inviter,
        address indexed invitee,
        string message
    );

    // Modifiers
    modifier isRegistered() {
        require(
            check_user_register_data[msg.sender].user_address == msg.sender,
            "You are not registered"
        );
        _;
    }

    modifier isProvider() {
        require(
            msg.sender == providers_details[msg.sender].providerAddress,
            "You are not provider"
        );
        _;
    }

    // Setter Functions

    function create_certificate(
        string memory _course_name,
        string[] memory _skills
    ) public isProvider {
        // require(
        //     !compareStrings(
        //         course_Names_skills[msg.sender][_course_name].course_name,
        //         _course_name
        //     ),
        //     "This certificate is already created"
        // );

        provider_certificate_data
            memory newCertificate = provider_certificate_data({
                course_name: _course_name,
                institute_name: providers_details[msg.sender].instituteName,
                provider_name: providers_details[msg.sender].providerName,
                provider_address: providers_details[msg.sender].providerAddress,
                skills: _skills
            });

        provider_certificates_details[msg.sender].push(newCertificate);

        certifications.push(_course_name);

        providers_details[msg.sender].certificate_counts++;

        course_Names_skills[msg.sender][_course_name]
            .course_name = _course_name;
        course_Names_skills[msg.sender][_course_name].skills = _skills;

        uint256 skillsLength = skills.length;
        uint256 additionalSkillsLength = _skills.length;
        string[] memory combinedSkills = new string[](
            skillsLength + additionalSkillsLength
        );

        for (uint256 i = 0; i < skillsLength; i++) {
            combinedSkills[i] = skills[i];
        }

        for (uint256 i = 0; i < additionalSkillsLength; i++) {
            combinedSkills[skillsLength + i] = _skills[i];
        }

        skills = combinedSkills;
    }

    function give_certificate_to_user(
        string memory _course_name,
        string memory _course_length,
        string memory _certificate_url,
        string[] memory _instructors_names,
        address _taker_address
    ) public isProvider {
        require(owner() != _taker_address, "owner can't give certificate.");
        // require(
        //     providers_details[msg.sender].providerAddress != _taker_address,
        //     "Provider can't give certificate."
        // );

        require(
            check_user_register_data[_taker_address].user_address ==
                _taker_address,
            "Taker is not registered."
        );

        require(
            compareStrings(
                course_Names_skills[msg.sender][_course_name].course_name,
                _course_name
            ),
            "Course not found"
        );

        // require(
        //     _is_user_certified[_taker_address][_course_name]._user_status !=
        //         user_status.Certified,
        //     "This user is already certified in this course."
        // );

        certificate_detail memory NewCertificate2 = certificate_detail({
            issue_date: block.timestamp,
            course_name: _course_name,
            course_length: _course_length,
            skills: course_Names_skills[msg.sender][_course_name].skills,
            certificate_url: _certificate_url,
            instructors_names: _instructors_names
        });

        userCertificates[_taker_address].push(NewCertificate2);

        fixUserCertificates[_taker_address]
            .candidiate_name = check_user_register_data[_taker_address]
            .user_name;
        fixUserCertificates[_taker_address].providerName = providers_details[
            msg.sender
        ].providerName;
        fixUserCertificates[_taker_address].instituteName = providers_details[
            msg.sender
        ].instituteName;
        fixUserCertificates[_taker_address].user_id = check_user_register_data[
            _taker_address
        ].user_id;
        fixUserCertificates[_taker_address].giver_address = msg.sender;
        fixUserCertificates[_taker_address].taker_address = _taker_address;
        fixUserCertificates[_taker_address]._user_status = user_status
            .Certified;

        _is_user_certified[_taker_address][_course_name]
            .course_name = _course_name;
        _is_user_certified[_taker_address][_course_name]
            .certificate_url = _certificate_url;
        _is_user_certified[_taker_address][_course_name]
            ._user_status = user_status.Certified;

        emit CertificateIssued(
            _taker_address,
            providers_details[msg.sender].providerAddress,
            _course_name,
            _certificate_url
        );
    }

    function register_yourself(string memory _name) public {
        require(msg.sender != owner(), "Owner can't do anything");
        require(
            check_user_register_data[msg.sender].user_address != msg.sender,
            "You have already registered"
        );

        user_registered_count++;

        check_user_register_data[msg.sender].user_address = msg.sender;
        check_user_register_data[msg.sender].user_name = _name;
        check_user_register_data[msg.sender].user_id = user_registered_count;
    }

    function become_provider(string memory _institute_name)
        public
        isRegistered
    {
        require(
            msg.sender != providers_details[msg.sender].providerAddress,
            "You are already provider"
        );

        providers_details[msg.sender].providerName = check_user_register_data[
            msg.sender
        ].user_name;
        providers_details[msg.sender].instituteName = _institute_name;
        providers_details[msg.sender]
            .providerAddress = check_user_register_data[msg.sender]
            .user_address;
    }

    function send_certificate(address _to, string memory _course_name)
        public
        isRegistered
    {
        // require(
        //     _to != msg.sender ||
        //         providers_details[msg.sender].providerAddress != _to ||
        //         owner() != _to,
        //     "You can't sent at this address"
        // );

        require(
            check_user_register_data[_to].user_address == _to,
            "receiver is not registered"
        );

        require(
            _is_user_certified[msg.sender][_course_name]._user_status ==
                user_status.Certified,
            "You are not certified in this course."
        );

        invitations_data memory userCertificate = invitations_data({
            sended_address: msg.sender,
            course_name: _course_name,
            certificate_url: _is_user_certified[msg.sender][_course_name]
                .certificate_url
        });

        certificateInvitations[_to].push(userCertificate);

        string memory certificateUrl = _is_user_certified[msg.sender][
            _course_name
        ].certificate_url;

        emit CertificateSend(_to, msg.sender, _course_name, certificateUrl);
    }

    function invite_others(address _address, string memory _message)
        public
        isRegistered
    {
        require(_address != msg.sender, "You can't invite yourself.");
        // require(_address != owner(), "You can't invite owner.");
        // require(
        //     _address != providers_details[_address].providerAddress,
        //     "You can't invite provider."
        // );
        require(
            check_user_register_data[_address].user_address != _address,
            "This is already a registered user."
        );
        address invitedAddress = _address;

        emit InvitationSent(msg.sender, invitedAddress, _message);
    }

    // Getter Functions

    function get_user_certificates(address _user_address)
        public
        view
        returns (
            string memory candidiateName,
            uint256 user_id,
            uint256[] memory issueDates,
            string[] memory courseNames,
            string[] memory courseLengths,
            string memory instituteName,
            string[][] memory _skills,
            string[] memory certificateUrls,
            string[][] memory instructorsNames,
            address takerAddress,
            address giverAddress,
            user_status status
        )
    {
        certificate_detail[] storage userCertificatesArray = userCertificates[
            _user_address
        ];

        candidiateName = fixUserCertificates[_user_address].candidiate_name;
        user_id = fixUserCertificates[_user_address].user_id;
        issueDates = new uint256[](userCertificatesArray.length);
        courseNames = new string[](userCertificatesArray.length);
        courseLengths = new string[](userCertificatesArray.length);
        instituteName = fixUserCertificates[_user_address].instituteName;
        _skills = new string[][](userCertificatesArray.length);
        certificateUrls = new string[](userCertificatesArray.length);
        instructorsNames = new string[][](userCertificatesArray.length);
        takerAddress = fixUserCertificates[_user_address].taker_address;
        giverAddress = fixUserCertificates[_user_address].giver_address;
        status = fixUserCertificates[_user_address]._user_status;

        for (uint256 i = 0; i < userCertificatesArray.length; i++) {
            issueDates[i] = userCertificatesArray[i].issue_date;
            courseNames[i] = userCertificatesArray[i].course_name;
            _skills[i] = userCertificatesArray[i].skills;
            courseLengths[i] = userCertificatesArray[i].course_length;
            certificateUrls[i] = userCertificatesArray[i].certificate_url;
            instructorsNames[i] = userCertificatesArray[i].instructors_names;
        }

        return (
            candidiateName,
            user_id,
            issueDates,
            courseNames,
            courseLengths,
            instituteName,
            _skills,
            certificateUrls,
            instructorsNames,
            takerAddress,
            giverAddress,
            status
        );
    }

    function get_received_Certificates()
        public
        view
        returns (
            address[] memory _sended_addresses,
            string[] memory _course_names,
            string[] memory _certificate_urls
        )
    {
        uint256 numInvitations = certificateInvitations[msg.sender].length;
        _sended_addresses = new address[](numInvitations);
        _course_names = new string[](numInvitations);
        _certificate_urls = new string[](numInvitations);

        for (uint256 i = 0; i < numInvitations; i++) {
            _sended_addresses[i] = certificateInvitations[msg.sender][i]
                .sended_address;
            _course_names[i] = certificateInvitations[msg.sender][i]
                .course_name;
            _certificate_urls[i] = certificateInvitations[msg.sender][i]
                .certificate_url;
        }

        return (_sended_addresses, _course_names, _certificate_urls);
    }

    function is_user_certified(address _address, string memory _course_name)
        public
        view
        returns (user_status)
    {
        return _is_user_certified[_address][_course_name]._user_status;
    }

    function find_skills(string memory keyword)
        public
        view
        returns (string[] memory Skills)
    {
        uint256 matchingCount = 0;
        string[] memory matchingSentences = new string[](skills.length);

        for (uint256 i = 0; i < skills.length; i++) {
            if (containsIgnoreCase(skills[i], keyword)) {
                matchingSentences[matchingCount] = skills[i];
                matchingCount++;
            }
        }

        Skills = new string[](matchingCount);
        for (uint256 i = 0; i < matchingCount; i++) {
            Skills[i] = matchingSentences[i];
        }

        return (Skills);
    }

    function find_certificates(string memory keyword)
        public
        view
        returns (
            string[] memory Certificates,
            address[] memory Providers,
            string[] memory Institutes,
            string[][] memory Skills
        )
    {
        string[] memory foundCertificates;
        address[] memory foundProviders;
        string[] memory foundInstitutes;
        string[][] memory foundSkills;
        uint256 foundCount = 0;

        for (uint256 i = 0; i < certifications.length; i++) {
            if (containsIgnoreCase(certifications[i], keyword)) {
                foundCount++;
            }
        }

        foundCertificates = new string[](foundCount);
        foundProviders = new address[](foundCount);
        foundInstitutes = new string[](foundCount);
        foundSkills = new string[][](foundCount);
        foundCount = 0;

        for (uint256 i = 0; i < certifications.length; i++) {
            if (containsIgnoreCase(certifications[i], keyword)) {
                foundCertificates[foundCount] = certifications[i];
                address providerAddress = providers_details[msg.sender]
                    .providerAddress;
                foundProviders[foundCount] = providerAddress;
                foundInstitutes[foundCount] = providers_details[providerAddress]
                    .instituteName;

                string[] storage certificateSkills = course_Names_skills[
                    msg.sender
                ][certifications[i]].skills;
                foundSkills[foundCount] = certificateSkills;

                foundCount++;
            }
        }

        return (
            foundCertificates,
            foundProviders,
            foundInstitutes,
            foundSkills
        );
    }

    // Supporting Functions
    function compareStrings(string memory a, string memory b)
        private
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function containsIgnoreCase(string memory str, string memory substr)
        private
        pure
        returns (bool)
    {
        bytes memory strBytes = bytes(str);
        bytes memory substrBytes = bytes(substr);

        if (strBytes.length < substrBytes.length) return false;

        for (uint256 i = 0; i <= strBytes.length - substrBytes.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < substrBytes.length; j++) {
                if (
                    toLowerCase(strBytes[i + j]) != toLowerCase(substrBytes[j])
                ) {
                    found = false;
                    break;
                }
            }
            if (found) return true;
        }

        return false;
    }

    function toLowerCase(bytes1 b) private pure returns (bytes1) {
        if (uint8(b) >= 65 && uint8(b) <= 90) {
            return bytes1(uint8(b) + 32);
        }
        return b;
    }
}

