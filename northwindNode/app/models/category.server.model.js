'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
* validation
*/
function validateLength(v){
	// custom validation function cehcks strength length to be used by model
	return v.length <= 16;
}

function validateNotZero(v){
	return v.length > 2;
}
/**
 * Category Schema
 */
var CategorySchema = new Schema({
	//the property name
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		default: '',
		trim: true
	},

	name: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'name cannot be blank',
		validate: ([validateNotZero,'Name must be longer than 2'],[validateLength, 'name must be 16 chars in length or less'])
	}

	// Category model fields
	// ...
});

mongoose.model('Category', CategorySchema);
