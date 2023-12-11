import { LightningElement, api,wire } from 'lwc';
import fetchRecords from '@salesforce/apex/CustomObjectController.fetchRecords';
import updateRecord from '@salesforce/apex/CustomObjectController.updateRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class UpdateRecord extends LightningElement {
    @api recordId; // Id of the record being edited

    @wire(fetchRecords) 
    companies;

    recordData = {};

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.recordData[field] = event.target.value;
    }

    onUpdateRecord() {
        updateRecord({ recordId: this.recordId, updatedData: this.recordData })
            .then(result => {
                console.log("result: " + JSON.stringify(result));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record updated successfully',
                        variant: 'success',
                    })
                );

                // Close the update form and refresh the data
                this.dispatchEvent(new CustomEvent('close'));
                return refreshApex(this.companies);
            })
            .catch(error => {
                console.error("errorr: " + JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occurred while updating the record',
                        variant: 'error',
                    })
                );
            })
    }

    onClose() {
        // Close the update form
        this.dispatchEvent(new CustomEvent('close'));
    }
}
