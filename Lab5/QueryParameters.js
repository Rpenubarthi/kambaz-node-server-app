export default function QueryParameters(app) {
    const calculator = (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;

        const A = parseInt(a);
        const B = parseInt(b);

        switch (operation) {
            case "add":
                result = A + B;
                break;
            case "subtract":
                result = A - B;
                break;
            case "multiply":
                result = A * B;
                break;
            case "divide":
                result = B !== 0 ? A / B : "Cannot divide by zero";
                break;
            default:
                result = "Invalid operation";
        }

        res.status(200).send(result.toString());
    };

    app.get("/lab5/calculator", calculator);
}
