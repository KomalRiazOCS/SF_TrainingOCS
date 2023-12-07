import { LightningElement, api,wire } from 'lwc';
import deleteCompany from '@salesforce/apex/CustomObjectController.deleteCompany';
import fetchRecords from '@salesforce/apex/CustomObjectController.fetchRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class DeleteRecord extends LightningElement {
    @api recordId; // Id of the record being deleted

    companyIds;

    @wire(fetchRecords)
    companies;

    onDeleteRecord() {
        deleteCompany({ companyIds: this.recordId })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted successfully',
                        variant: 'success',
                    })
                );
                // Close the delete form and refresh the data
                this.dispatchEvent(new CustomEvent('close'));
                return refreshApex(this.companies);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occurred while deleting the record',
                        variant: 'error',
                    })
                );
            });
    }

    onClose() {
        // Close the delete form
        this.dispatchEvent(new CustomEvent('close'));
    }
}
