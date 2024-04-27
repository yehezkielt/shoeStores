const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: "Email already exist"})
            break;
        case "SequelizeValidationError":
            res.status(400).json({message: err.errors[0].message})
            break;
        case "EmailRequired":
            res.status(400).json({message: "Email validation errors"})
            break;
        case "PasswordRequired":
            res.status(400).json({message: "Password validation errors"})
            break;
        case "InvalidLogin":
            res.status(401).json({message: "Invalid Email/Password"})
            break;
        case "NotFound":
            res.status(404).json({message: "Error not found"})
            break;
        case "InvalidToken":
            res.status(401).json({message: "Invalid Token, please login first"})
            break;
        case "ImageIsRequired":
            res.status(401).json({message: "ImageUrl validation error"})
            break;
        case "file_empty":
			res.status(400).json({ msg: "Please insert your file" });
			break;
        case "id_not_found":
            res.status(404).json({ msg: "Data not found" });
            break;
        case "Forbidden":
            res.status(403).json({message: "Forbidden"})
            break;
    
        default:
            res.status(500).json({message: "Internal Server Error"})
            break;
    }
}
module.exports = errorHandler