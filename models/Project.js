import { Schema, model } from "mongoose"

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    joinedMembers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    plan: {
        enum: ['basic', 'professional', 'entreprise'],
        type: String,
        default: 'basic'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    localisation: {
        type: {
            lat: String,
            lng: String
        },
        required: true
    }
}, { timestamps: true });

const Project = model('Project', projectSchema);

export default Project;