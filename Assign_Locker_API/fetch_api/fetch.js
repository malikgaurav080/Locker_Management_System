//Only for Admin
// function DeleteLocker(req, res) {
//   locker.deleteOne({ id: req.params.id }, (err, docs) => {
//       if (!err) {
//           res.status(200).send({ message: 'Locker Deleted Successfully' });
//       } else {
//           throw err;
//       }
//   });
// }


async function small(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-inc/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      }); 
      
}


async function medium(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-inc/2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });                
}

async function large(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-inc/3', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {       
        console.error('Error:', error);
      });                
}


async function xlarge(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-inc/4', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });                
}


async function smalld(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-dec/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      }); 
      
}


async function mediumd(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-dec/2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });                
}

async function larged(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-dec/3', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });                
}


async function xlarged(){
    const data = {};

    fetch('http://localhost:3004/lockerType/auto-dec/4', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });                
}


module.exports = {small, smalld, medium, mediumd, large, larged, xlarge, xlarged};