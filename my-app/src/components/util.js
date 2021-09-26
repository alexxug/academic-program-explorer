import _ from 'lodash'

export const cleanAvailabilityString= (availabilityString)=>{
const semesters = availabilityString.split(';').map(semester => semester.split(','))
const semesterTimeArray = semesters.map(semester => semester[0])
const pureSemesterTimeArray = _.uniq(semesterTimeArray.map(semester=>semester.trim()).filter(time => time !==""))
const SemesterTimeResult = pureSemesterTimeArray.map(semester => {
	if (semester.includes('Not')) {
		return 'na'
	}
	else if(semester.split(' ')[1] == '1'){
		return 'Semester1'
	}
	else {
		return 'Semester2'
	}
})
return SemesterTimeResult
}

export const cleanIncompatibilityString = (incompatibilityString) =>{
	const units = incompatibilityString?.split(',')||[]
	if(_.isEmpty(units)) return units
	const unitCode = units.map(unit => {
		return unit.split(' ').filter(e => e !== '')[0]
	})
	return unitCode
}

export const buildFinalUnits = (cleanUnits) =>{
	return cleanUnits.map(unit =>{
		return {
			unitCode: unit[0],
			title: unit[1],
			role: unit[2],
			availability: unit[3],
			outcome: unit[4],
			prerequisite: unit[5]??'',
			advisablePriorStudy: unit[6]??'',
			incompatibility: unit[8],
		}
	})
}
