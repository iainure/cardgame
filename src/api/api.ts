// ts definitions

interface ScoreData {
	name: string,
	email: string,
	score: number,
	timestamp: number
}


const awsKey = 'AWS_API_KEY'
const url:string = 'https://rtxfmczx53.execute-api.eu-west-2.amazonaws.com/PROD'

const generateId = () => Date.now() * (Math.floor(Math.random() * 1000))

export const saveScore = async (scoreJson: ScoreData) => {

	try {

		let res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': awsKey
			},
			body: JSON.stringify(Object.assign({}, scoreJson, {id: generateId()}))
		})

		return res

	}

	catch(err){

		throw new Error('Unable to save score')

	}

}

export const loadScores = () => fetch(url, {
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
		'x-api-key': awsKey
	}
})