import mongoose, {Schema} from 'mongoose';

const IncidentSchema = new mongoose.Schema({
    reportDate: Date,
    subject: String,
    type: String,
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: String,
    deadline: Number,
    description: String,
    isResolved: Boolean,
});

IncidentSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('Incidents', IncidentSchema);