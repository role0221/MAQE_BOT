interface LocationInterface {
    x: number;
    y: number;
}

enum ACTION_TYPE {
    RIGHT = 'R',
    LEFT = 'L',
    WALK = 'W'
}

enum DIRECTION {
    N = 'North',
    E = 'East',
    W = 'West',
    S = 'South'
}

async function actionRight(direction: DIRECTION): Promise<DIRECTION> {
    let result = direction
    switch (direction) {
        case DIRECTION.N:
            result = DIRECTION.E
            break;
        case DIRECTION.E:
            result = DIRECTION.S
            break;
        case DIRECTION.W:
            result = DIRECTION.N
            break;
        case DIRECTION.S:
            result = DIRECTION.W
            break;
        default:
            console.log('Unknown Direction');
            break;
    }
    return result
}

async function actionLeft(direction: DIRECTION): Promise<DIRECTION> {
    let result = direction
    switch (direction) {
        case DIRECTION.N:
            result = DIRECTION.W
            break;
        case DIRECTION.E:
            result = DIRECTION.N
            break;
        case DIRECTION.W:
            result = DIRECTION.S
            break;
        case DIRECTION.S:
            result = DIRECTION.E
            break;
        default:
            console.log('Unknown Direction');
            break;
    }
    return result
}

async function actionMove(location: { x: number, y: number }, direction: DIRECTION, moveLength: number): Promise<LocationInterface> {
    let result = location
    switch (direction) {
        case DIRECTION.N:
            console.log('Move North:', moveLength);
            result.y = result.y + moveLength
            break;
        case DIRECTION.E:
            console.log('Move East:', moveLength);
            result.x = result.x + moveLength
            break;
        case DIRECTION.W:
            console.log('Move West:', moveLength);
            result.x = result.x - moveLength
            break;
        case DIRECTION.S:
            console.log('Move South:', moveLength);
            result.y = result.y - moveLength
            break;
        default:
            console.log('Unknown Direction');
            break;
    }
    return result
}

// Upper & Lower Case
async function bot(input: string) {
    let direction = DIRECTION.N
    let location: LocationInterface = { x: 0, y: 0 };

    const inputUpperCase = input.toUpperCase();
    const inputLength = inputUpperCase.length

    for (let i = 0; i < inputLength; i++) {

        if (inputUpperCase[i] === ACTION_TYPE.RIGHT) {
            direction = await actionRight(direction)
        }
        if (inputUpperCase[i] === ACTION_TYPE.LEFT) {
            direction = await actionLeft(direction)
        }

        if (inputUpperCase[i] === ACTION_TYPE.WALK) {
            let moveLength = ''
            while (!isNaN(Number(inputUpperCase[i + 1]))) {
                moveLength = moveLength + inputUpperCase[i + 1]
                i = i + 1;
            }
            const lengthNumber = Number(moveLength)
            location = await actionMove(location, direction, lengthNumber)
        }
    }
    return { X: location.x, Y: location.y, Direction: direction }
}

//  Case-Sensitive
async function botCaseSensitive(input: string) {
    let direction = DIRECTION.N
    let location: LocationInterface = { x: 0, y: 0 };

    const inputLength = input.length
    for (let i = 0; i < inputLength; i++) {

        if (input[i] === ACTION_TYPE.RIGHT) {
            direction = await actionRight(direction)
        }
        if (input[i] === ACTION_TYPE.LEFT) {
            direction = await actionLeft(direction)
        }

        if (input[i] === ACTION_TYPE.WALK) {
            let moveLength = ''
            while (!isNaN(Number(input[i + 1]))) {
                moveLength = moveLength + input[i + 1]
                i = i + 1;
            }
            const lengthNumber = Number(moveLength)
            location = await actionMove(location, direction, lengthNumber)
        }
    }
    return { X: location.x, Y: location.y, Direction: direction }
}

async function main() {
    const input = 'RW15RW1'   // set input
    const result = await botCaseSensitive(input)
    console.log('result :', result)
}

main()