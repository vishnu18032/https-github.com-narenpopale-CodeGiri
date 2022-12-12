const express = require("express");
const compiler = require('compilex');
const Problem = require("../models/problemsModel");

const router = express.Router();

var options = { stats: true };
compiler.init(options);


// Get all old Problems
router.route("/old").get(async (req, res) => {
    try {
        const problems = await Problem.find({ status: "Old" });
        res.json(problems);
    }
    catch (error) {
        res.json({ message: error });
    }
})


// Get Specific Problem
router.route("/old/:id").get(async (req, res) => {
    try {
        const problems = await Problem.find({ _id: req.params.id });
        res.json(problems);
    }
    catch (error) {
        res.json({ message: error });
    }
})


// Get all new Problems
router.route("/new").get(async (req, res) => {
    try {
        const problems = await Problem.find({ status: "New" });
        res.json(problems);
    }
    catch (error) {
        res.json({ message: error });
    }
})


// Create new Problem
router.post("/new", async (req, res) => {
    let problem = new Problem(req.body);

    try {
        const savedPost = await problem.save();
        res.json(savedPost);
    }
    catch (error) {
        res.json(error);
    }
})


// Get Problems by Contest Code
router.route("/problems/:code").get(async (req, res) => {
    try {
        const problems = await Problem.find({ contestCode: req.params.code });
        res.json(problems);
    }
    catch (error) {
        res.json({ message: error });
    }
})


// Update Contest Code of Problem
router.route("/problem/:id").patch(async (req, res) => {
    try {
        const problem = await Problem.updateOne(
            { _id : req.params.id},
            { $set: { contestCode: req.body.code } }
        )
        res.json(problem);
    }
    catch (error) {
        res.json(error);
    }
})


// Update Problem New to Old
router.route("/:code").patch(async (req, res) => {
    try {
        const problem = await Problem.updateMany(
            { contestCode: req.params.code },
            { $set: { status : "Old" } }
        )
        res.json(problem);
    }
    catch (error) {
        res.json(error);
    }
})


// Compile Problem --> Specify Only Compiler name
router.route("/compile").post(async (req, res) => {
    try {

        if (req.body.cmd == "g++") {
            var envData = { OS: "windows", cmd: req.body.cmd, options: { timeout: 100 } };
            var code = req.body.code;

            if (!req.body.input) {
                compiler.compileCPP(envData, code, function (data) {
                    console.log(data.output);
                    res.json(data.output);
                });
            }
            else {
                var input = req.body.input;
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    console.log(data.output);
                    res.json(data.output);
                });
            }
        }
        else if (req.body.cmd == "jdk") {
            var envData = { OS: "windows", options: { timeout: 100 } };
            var code = req.body.code;

            if (!req.body.input) {
                compiler.compileJava(envData, code, function (data) {
                    console.log(data.output);
                    res.json(data.output);
                });
            }
            else {
                var input = req.body.input;
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    console.log(data.output);
                    res.json(data.output);
                });
            }
        }
        else if (req.body.cmd == "py") {
            var envData = { OS: "windows", options: { timeout: 100 } };
            var code = req.body.code;

            if (!req.body.input) {
                compiler.compilePython(envData, code, function (data) {
                    console.log(data.output);
                    res.json(data.output);
                });
            }
            else {
                var input = req.body.input;
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    console.log(data.output);
                    res.json(data.output);
                });
            }
        }
    }
    catch (error) {
        res.json({ message: error });
    }
})


// Submit Problem --> Specify Only Compiler name
router.route("/submit").post(async (req, res) => {
    try {

        if (req.body.cmd == "g++") {
            var envData = { OS: "windows", cmd: req.body.cmd, options: { timeout: 100 } };
            var code = req.body.code;

            if (!req.body.input) {
                compiler.compileCPP(envData, code, function (data) {
                    var str1 = data.output;
                    var str1 = str1.replace(/\r?\n|\r/g, '');
                    var str1 = str1.replaceAll(" ", "");
                    
                    var str2 = req.body.ExpextedOutput;
                    var str2 = str2.replace(/\r?\n|\r/g, '');
                    var str2 = str2.replaceAll(" ", "");
                    console.log(str1);
                    console.log(str2);

                    // Test Cases checked here
                    if (str1 == str2) {
                        res.json("Correct Answer");
                    }
                    else {
                        res.json("Wrong Answer");                        
                    };
                });
            }
            else {
                var input = req.body.input;
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    var str1 = data.output;
                    var str1 = str1.replace(/\r?\n|\r/g, '');
                    var str1 = str1.replaceAll(" ", "");
                    
                    var str2 = req.body.ExpextedOutput;
                    var str2 = str2.replace(/\r?\n|\r/g, '');
                    var str2 = str2.replaceAll(" ", "");
                    console.log(str1);
                    console.log(str2);

                    // Test Cases checked here
                    if (str1 == str2) {
                        res.json("Correct Answer");
                    }
                    else {
                        res.json("Wrong Answer");                        
                    };
                });
            }
        }
        else if (req.body.cmd == "jdk") {
            var envData = { OS: "windows", options: { timeout: 100 } };
            var code = req.body.code;

            if (!req.body.input) {
                compiler.compileJava(envData, code, function (data) {
                    var str1 = data.output;
                    var str1 = str1.replace(/\r?\n|\r/g, '');
                    var str1 = str1.replaceAll(" ", "");
                    
                    var str2 = req.body.ExpextedOutput;
                    var str2 = str2.replace(/\r?\n|\r/g, '');
                    var str2 = str2.replaceAll(" ", "");
                    console.log(str1);
                    console.log(str2);

                    // Test Cases checked here
                    if (str1 == str2) {
                        res.json("Correct Answer");
                    }
                    else {
                        res.json("Wrong Answer");                        
                    };
                });
            }
            else {
                var input = req.body.input;
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    var str1 = data.output;
                    var str1 = str1.replace(/\r?\n|\r/g, '');
                    var str1 = str1.replaceAll(" ", "");
                    
                    var str2 = req.body.ExpextedOutput;
                    var str2 = str2.replace(/\r?\n|\r/g, '');
                    var str2 = str2.replaceAll(" ", "");
                    console.log(str1);
                    console.log(str2);

                    // Test Cases checked here
                    if (str1 == str2) {
                        res.json("Correct Answer");
                    }
                    else {
                        res.json("Wrong Answer");                        
                    };
                });
            }
        }
        else if (req.body.cmd == "py") {
            var envData = { OS: "windows", options: { timeout: 100 } };
            var code = req.body.code;

            if (!req.body.input) {
                compiler.compilePython(envData, code, function (data) {
                    var str1 = data.output;
                    var str1 = str1.replace(/\r?\n|\r/g, '');
                    var str1 = str1.replaceAll(" ", "");
                    
                    var str2 = req.body.ExpextedOutput;
                    var str2 = str2.replace(/\r?\n|\r/g, '');
                    var str2 = str2.replaceAll(" ", "");
                    console.log(str1);
                    console.log(str2);

                    // Test Cases checked here
                    if (str1 == str2) {
                        res.json("Correct Answer");
                    }
                    else {
                        res.json("Wrong Answer");                        
                    };
                });
            }
            else {
                var input = req.body.input;
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    var str1 = data.output;
                    var str1 = str1.replace(/\r?\n|\r/g, '');
                    var str1 = str1.replaceAll(" ", "");
                    
                    var str2 = req.body.ExpextedOutput;
                    var str2 = str2.replace(/\r?\n|\r/g, '');
                    var str2 = str2.replaceAll(" ", "");
                    console.log(str1);
                    console.log(str2);

                    // Test Cases checked here
                    if (str1 == str2) {
                        res.json("Correct Answer");
                    }
                    else {
                        res.json("Wrong Answer");                        
                    };
                });
            }
        }
    }
    catch (error) {
        res.json({ message: error });
    }
})


module.exports = router;