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
        List<Company__c> results = new List<Company__c>();

        if (String.isNotBlank(searchTerm)) {
            results = [SELECT Id, Name, Email__c FROM Company__c WHERE Name LIKE :('%' + searchTerm + '%')];
        }

        if (results.isEmpty()) {
            return new List<Company__c>();
        } else {
            return results;
        }
    }

    @AuraEnabled
    public static List<Company__c> createCompany(Map<String, Object> recordData) {
        List<Company__c> cmpList = new List<Company__c>();

        try {
            Company__c cmp = new Company__c();
            Boolean hasNonEmptyFields = false;

            for (String field : recordData.keySet()) {
                if (recordData.get(field) != null && !String.isBlank(String.valueOf(recordData.get(field)))) {
                    cmp.put(field, recordData.get(field));
                    hasNonEmptyFields = true;
                }
            }

            if (hasNonEmptyFields) {
                cmpList.add(cmp);
                insert cmpList;
                return cmpList;
            }
        } catch (DmlException e) {
            System.debug('An error occurred while inserting records: ' + e.getMessage());
        }

        return null;
    }

    
    @AuraEnabled
    public static List<Company__c> updateRecord(String recordId, Map<String, Object> updatedData) {
        List<Company__c> cmpList = new List<Company__c>();

        try {
            Company__c cmp = [SELECT Id FROM Company__c WHERE Id = :recordId LIMIT 1];
            if (cmp != null) {
                for (String field : updatedData.keySet()) {
                    if (updatedData.get(field) != null && !String.isBlank(String.valueOf(updatedData.get(field)))) {
                        cmp.put(field, updatedData.get(field));
                    }
                }
                cmpList.add(cmp);

                if (!cmpList.isEmpty()) {
                    update cmpList;
                }
            }
        } catch (DmlException e) {
            System.debug('An error occurred while updating records: ' + e.getMessage());
        }

        return cmpList;
    }



    @AuraEnabled
    public static void deleteCompany(Id companyIds) {
        List<Company__c> cmpList = new List<Company__c>();
    
        try {
            Company__c[] cmps = [SELECT id FROM Company__c WHERE Id = :companyIds];
            for (Company__c cmp : cmps) {
                cmpList.add(cmp);
            }
    
            if (!cmpList.isEmpty()) {
                delete cmpList;
            }
        } catch (DmlException e) {
            System.debug('An error occurred while deleting records: ' + e.getMessage());
        }
    }
    
}