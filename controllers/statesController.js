const State = require('../model/states.js');
const fs = require('fs');
const { compareDesc } = require('date-fns');
const { restart } = require('nodemon');

const getAllStatesData = async (req, res) => {
    var stateDocument;
    fs.readFile('./model/states.json', async (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        if (req.query.contig == 'true') {
            var contigs = [];
            for (var index in statesList) {
                stateDocument = await State.find({"code": statesList[index.code]});
                //Check if state has funfacts
                if (statesList[index].code != 'AK' && statesList[index].code != 'HI') {
                    if (stateDocument.length > 0) {
                        statesList.funfacts = stateDocument[0].funfacts;
                    }
                    contigs.push(statesList[index]);
                }
            }
            statesList = contigs;
        }
        else if (req.query.contig == 'false') {
            var noncontigs = [];
            for (var index in statesList) {
                stateDocument = await State.find({"code": statesList[index.code]});
                if (statesList[index].code == 'AK' || states[index].code == 'HI') {
                    if (stateDocument.length > 0) {
                        statesList.funfacts = stateDocument[0].funfacts;
                    }
                    noncontigs.push(statesList[key]);
                }
            }
            statesList = noncontigs;
        }
        else {
            for (var i = 0; i < statesList.length; i++) {
                stateDocument = await State.find({ "code": statesList[i].code.toUpperCase() });
                //Check if state has funfacts
                if (stateDocument.length > 0) {
                    statesList[i].funfacts = stateDocument[0].funfacts;
                }
            }
        }
        res.json(statesList);
    })
};

const getSpecificStateData = async (req, res) => {
    const code = (req.params.id).toUpperCase();
    const stateDocument = await State.find({"code": code});
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        const check = (check) => check == code;
        const codes = [];
        for (var index in statesList) {
            if (statesList.hasOwnProperty(index)) {
                codes.push(statesList[index].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            const state = statesList[codes.findIndex(check)];
            //Check if state has any fun facts
            if (stateDocument.length > 0) {
                if (stateDocument[0].funfacts.length > 0) {
                //If a state has fun facts...
                    state.funfacts = stateDocument[0].funfacts;
                }
            }
            //If a state doesn't have funfacts, don't add to the json result.
            return res.json(state);
        }
        else {
            return res.status(404).json({message: "State not found"});
        }
    }    
)};

const getStateFunFact = async (req,res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: "State abreviation is required. " });
    }
    const code = (req.params.id).toUpperCase();
    const stateDocument = await State.find( {"code": code} );
        if (stateDocument.length > 0) {
            if (stateDocument[0].funfacts.length > 0) {
                randomIndex = Math.floor(Math.random() * stateDocument[0].funfacts.length);
                return res.json( { "funfact": stateDocument[0].funfacts[randomIndex] } );
            }
        }
        fs.readFile('./model/states.json', (err, data) => {
            if (err) throw err;
            var statesList = JSON.parse(data);
            const check = (check) => check == code;
            var stateName = '';
            const codes = [];
            for (var index in statesList) {
                if (statesList.hasOwnProperty(index)) {
                    codes.push(statesList[index].code);
                }
            }
            if (codes.findIndex(check) > -1) {
                stateName = statesList[codes.findIndex(check)].state;
            }
            if (stateName == '') {
                return res
                    .status(404)
                    .json({ message: 'Invalid state abreviation.'})
            }
            return res
                .status(404)
                .json({ message: `No fun facts found for ${stateName}.` });
          });
}


const getStateCapital = async (req, res) => {
    const code = (req.params.id).toUpperCase();
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        const check = (check) => check == code;
        var stateName = '';
        var stateCapital = '';
        const codes = [];
        for (var index in statesList) {
            if (statesList.hasOwnProperty(index)) {
                codes.push(statesList[index].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            stateName = statesList[codes.findIndex(check)].state;
            stateCapital = statesList[codes.findIndex(check)].capital_city;
        }
        if (stateName == '' || stateCapital == '') {
            return res
                .status(404)
                .json({ message: 'Invalid state abreviation.'})
        }
        return res
            .json({ state: stateName, capital: stateCapital});
    });
}

const getStateNickname = async (req,res) => {
    const code = (req.params.id).toUpperCase();
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        const check = (check) => check == code;
        var stateName = '';
        var stateNickname = '';
        const codes = [];
        for (var index in statesList) {
            if (statesList.hasOwnProperty(index)) {
                codes.push(statesList[index].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            stateName = statesList[codes.findIndex(check)].state;
            stateNickname = statesList[codes.findIndex(check)].nickname;
        }
        if (stateName == '' || stateNickname == '') {
            return res
                .status(404)
                .json({ message: 'Invalid state abreviation.'})
        }
        return res
            .json({ state: stateName, nickname: stateNickname});
    });
}

const getStatePopulation = async (req, res) => {
    const code = (req.params.id).toUpperCase();
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        const check = (check) => check == code;
        var stateName = '';
        var statePopulation = '';
        const codes = [];
        for (var index in statesList) {
            if (statesList.hasOwnProperty(index)) {
                codes.push(statesList[index].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            stateName = statesList[codes.findIndex(check)].state;
            statePopulation = statesList[codes.findIndex(check)].population;
        }
        if (stateName == '' || statePopulation == '') {
            return res
                .status(404)
                .json({ message: 'Invalid state abreviation.'})
        }
        return res
            .json({ state: stateName, population: statePopulation});
    });
}

const getStateAdmission = async (req, res) => {
    const code = (req.params.id).toUpperCase();
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        const check = (check) => check == code;
        var stateName = '';
        var stateAdmission = '';
        const codes = [];
        for (var index in statesList) {
            if (statesList.hasOwnProperty(index)) {
                codes.push(statesList[index].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            stateName = statesList[codes.findIndex(check)].state;
            stateAdmission = statesList[codes.findIndex(check)].admission_date;
        }
        if (stateName == '' || stateAdmission == '') {
            return res
                .status(404)
                .json({ message: 'Invalid state abreviation.'})
        }
        return res
            .json({ state: stateName, admitted: stateAdmission});
    });
}

const addFunFact = async (req, res) => {
    if (!req?.body.funfacts) {
        return res.status(400).json({ message: "No fun fact was entered in the post request." });
      }
      const code = (req.params.id).toUpperCase();
      fs.readFile('./model/states.json', (err, data) => {
          if (err) throw err;
          var statesList = JSON.parse(data);
          const check = (check) => check == code;
          var stateName = '';
          const codes = [];
          for (var index in statesList) {
              if (statesList.hasOwnProperty(index)) {
                  codes.push(statesList[index].code);
              }
          }
          if (codes.findIndex(check) > -1) {
              stateName = statesList[codes.findIndex(check)].state;
          }
          if (stateName == '') {
              return res
                  .status(404)
                  .json({ message: 'Invalid state abreviation.'});
          }
        });
    //Check if document exists
    const documentCheck = await State.find({"code": code });
    if (documentCheck.length > 0) {
        //If document does exist...
        const stateDocument = await State.findOne({ code: code }).exec();
        //var factsToAdd = JSON.parse(req.body);
        for (var i = 0; i < req.body.funfacts.length; i++) {
            stateDocument.funfacts.push(req.body.funfacts[i]);
        } 
        try {
            const result = await stateDocument.save();
            res.status(201).json(result);
          } catch (err) {
            console.log(err);
          }
    }
    else {
    //If document doens't exist...
      try {
        const result = await State.create({
            code: (req.params.id).toUpperCase(),
            funfacts: req.body.funfacts
        });
        res.status(201).json(result);
      } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Server error: " + err});
      }
    }
}

const updateFunFact = async (req, res) => {
    if (!req?.params.id) {
        return res.status(400)
            .json({ message: "State code required." });
    };
    const code = (req.params.id).toUpperCase();
    const stateDocument = await State.findOne({ code: req.params.id.toUpperCase() });
    stateName = stateExists(code);
    if (stateName = '') {
        return res.status(404)
            .json({message: "State not found."});
    }
    if (!stateDocument.funfacts.length > 0) {   
        return res
          .status(404)
          .json({ message: "State has no fun facts." });
    }
    const objectID = stateDocument._id;    
    if (!req.body.index || !req.body.funfact) {
        return res
            .status(401)
            .json({ message: "Missing either index or funfact in request body. (Remember index isn't 0-based!)"})
    }
    if (req.body.index > stateDocument.funfacts.length) {
        return res 
            .status(404)
            .json({message: `Index ${req.body.index} does not exist in the funfacts.`});
    }   
    stateDocument.funfacts[req.body.index - 1] = req.body.funfact; 
    try {
        const result = await stateDocument.save();
        return res.json(stateDocument);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const deleteFunFact = async (req, res) => {
    if (!req?.params.id) {
        return res.status(400)
            .json({ message: "State code required." });
    };
    const code = (req.params.id).toUpperCase();
    const stateDocument = await State.findOne({ code: req.params.id.toUpperCase() });
    stateName = stateExists(code);
    if (stateName = '') {
        return res.status(404)
            .json({message: "State not found."});
    }
    if (!stateDocument.funfacts.length > 0) {   //[0] CHANGE
        return res
          .status(404)
          .json({ message: "State has no fun facts." });
    }
    try {
        await State.updateOne({code: code}, {$unset : {["funfacts." + (req.body.index - 1)] : 1 }});
        await State.updateOne({code: code}, {$pull : {"funfacts" : null}});
        const result = await State.findOne({code: code});
        res.json(result);
    } catch (err) {
        console.log (err);
        return res
            .status(500)
            .json({message: err.message});
    }
}

function stateExists(code) {
    fs.readFile('./model/states.json', (err, data) => {
        if (err) throw err;
        var statesList = JSON.parse(data);
        const check = (check) => check == code;
        var stateName = '';
        const codes = [];
        for (var index in statesList) {
            if (statesList.hasOwnProperty(index)) {
                codes.push(statesList[index].code);
            }
        }
        if (codes.findIndex(check) > -1) {
            stateName = statesList[codes.findIndex(check)].state;
        }
        if (stateName == '') {
            return '';
        }
        return stateName
      });
}

module.exports = {
    getAllStatesData,
    getSpecificStateData,
    getStateFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission,
    addFunFact,
    updateFunFact,
    deleteFunFact
};