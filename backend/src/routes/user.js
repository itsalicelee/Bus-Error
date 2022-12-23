import User from '../models/user';

exports.CreateUser = async (req, res) => {
    const body = req.body;
    const { name, email, password, tag } = body;
    try {
        const user = new User({
            name: name,
            email: email,
            password: password,
            tag: tag,
        });
        await user.save();
        res.status(200).send({ message: 'success', contents: user });
    } catch (err) {
        console.log(err);
    }
};

exports.GetUser = async (req, res) => {
    const name = req.query.name;
    User.find({ name: name }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'error', contents: [] });
        } else {
            res.status(200).send({ message: 'success', contents: data });
        }
    });
};