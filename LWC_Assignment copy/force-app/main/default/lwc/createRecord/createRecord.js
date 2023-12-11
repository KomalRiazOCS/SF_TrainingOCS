import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import createCompany from '@salesforce/apex/CustomObjectController.createCompany';
import fetchRecords from '@salesforce/apex/CustomObjectController.fetchRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecord extends LightningElement {
    
    recordData = {
        Id: '',
        Name: '',
        Email__c: ''
    };

    @wire(fetchRecords)
    companies;

    handleInputChange(event){
        const field = event.target.dataset.field;
        this.recordData[field] = event.target.value;
    }

    onCreateRecord(){
        createCompany({ recordData: this.recordData })
        .then(result => {
            if(result!=null){
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record created successfully',
                        variant: 'success',
                    })
                );
            }
            else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occurred while creating the record',
                        variant: 'error',
                    })
                );
            }            
            return refreshApex(this.companies);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An error occurred while creating the record',
                    variant: 'error',
                })
            );
        })        
    }
    
}
