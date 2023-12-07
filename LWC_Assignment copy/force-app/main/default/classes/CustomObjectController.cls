public with sharing class CustomObjectController {
    
    @AuraEnabled(cacheable=true)
    public static List<Company__c> fetchRecords() {
        return [
            SELECT Id,Name, Email__c
            FROM Company__c
            WITH SECURITY_ENFORCED
        ]; 
    }

    @AuraEnabled
    public static List<Company__c> searchCompanies(String searchTerm) {
        
        return [SELECT Id,Name, Email__c FROM Company__c WHERE Name LIKE :('%' + searchTerm + '%')];
    }

    @AuraEnabled
    public static List<Company__c> createCompany(Map<String, Object> recordData) {
        List<Company__c> cmpList = new List<Company__c>();

        // Create a new Company__c record and set field values based on the provided data
        Company__c cmp = new Company__c();
        for (String field : recordData.keySet()) {
            // Only set non-null and non-blank values
            if (recordData.get(field) != null && !String.isBlank(String.valueOf(recordData.get(field)))) {
                cmp.put(field, recordData.get(field));
            }
        }
        cmpList.add(cmp);
        if (!cmpList.isEmpty()) {
            insert cmpList;
            return cmpList;
        }
        return null;
    }

    
    @AuraEnabled
    public static List<Company__c> updateRecord(String recordId, Map<String, Object> updatedData) {
        List<Company__c> cmpList = new List<Company__c>();

        // Ensure that the record with the given ID exists
        Company__c cmp = [SELECT Id FROM Company__c WHERE Id = :recordId LIMIT 1];
        if (cmp != null) {
            // Update fields based on the provided data
            for (String field : updatedData.keySet()) {
                // Only update non-null and non-blank values
                if (updatedData.get(field) != null && !String.isBlank(String.valueOf(updatedData.get(field)))) {
                    cmp.put(field, updatedData.get(field));
                }
            }
            cmpList.add(cmp);
            if (!cmpList.isEmpty()) {
                update cmpList;
                return cmpList;
            }
        }

        return null;
    }


    @AuraEnabled
    public static void deleteCompany(Id companyIds) {
        List<Company__c> cmpList= new List<Company__c> ();
        Company__c[] cmps= [SELECT id FROM Company__c WHERE Id =: companyIds];
        for (Company__c cmp : cmps) {
            cmpList.add(cmp);
        }
        if(!cmpList.isEmpty()){
            delete cmpList;
        }
    }
}