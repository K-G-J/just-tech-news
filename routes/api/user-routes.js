const router = require('express').Router();
const { User } = require('../../models');

// /api/users
router
	.route('/')
	.get((req, res) => {
		User.findAll({ attributes: { exclude: ['password'] } })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	})
	.post((req, res) => {
		User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	});
// /api/users/id
router
	.route('/:id')
	.get((req, res) => {
		User.findOne({
			attributes: { exclude: ['password'] },
			where: {
				id: req.params.id
			}
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found with this id'
					});
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	})
	.put((req, res) => {
		User.update(req.body, {
			where: {
				id: req.params.id
			}
		})
			.then((dbUserData) => {
				if (!dbUserData[0]) {
					res.status(404).json({
						message: 'No user found with this id'
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	})
	.delete((req, res) => {
		User.destroy({
			where: {
				id: req.params.id
			}
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: 'No user found with this id'
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	});

module.exports = router;
