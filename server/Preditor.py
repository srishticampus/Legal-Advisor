import collections

class CaseTypePredictor:
    def __init__(self):
        self.keywords = {
            "Criminal Law": ['burglary', 'murder', 'theft', 'arrested', 'defendant', 'charged', 'crime', 'criminal', "missing", "assault", "robbery", "homicide", "police", "court"],
            "Tax Law": ['tax', 'taxes', 'IRS', 'revenue', 'taxpayer', 'deductions', 'income tax', 'corporate tax', 'capital gains', 'estate tax', 'property tax', 'sales tax', 'tax audit', 'tax evasion', 'tax fraud', 'tax return', 'withholding', 'tax code', 'tax compliance'],
            "Real Estate Law": ['real estate', 'property', 'landlord', 'tenant', 'lease', 'rental', 'eviction', 'foreclosure', 'title deed', 'mortgage', 'boundary dispute', 'zoning', 'land use', 'condominium', 'co-op', 'deed restrictions', 'easement', "house", "apartment", "home", "commercial"],
            "Civil Law": ["sued", "contract", "breach", "plaintiff", "company", "liability", "dispute", "damages", "negligence", "tort", "arbitration", "litigation"],
            "Family Law": ["divorce", "custody", "marriage", "spouse", "parents", "family", "child support", "adoption", "prenuptial", "alimony", "separation"],
            "Environmental Law": ["pollution", "environment", "waste", "ecology", "conservation", "emissions", "climate change", "sustainability", "toxic", "resource", "eco", "green"],
            "Banking and Finance Law": ["loan", "interest", "bank", "mortgage", "investment", "finance", "credit", "debt", "bankruptcy", "securities", "financial", "investor"],
            "Human Rights Law": ["rights", "discrimination", "freedom", "justice", "equality", "dignity", "abuse", "torture", "refugee", "humanitarian"],
            "Constitutional Law": ["constitution", "amendment", "bill of rights", "federal", "government", "state", "supreme court", "separation of powers", "due process", "citizen", "law"],
            "Immigration Law": ["visa", "immigration", "deportation", "citizenship", "asylum", "green card", "naturalization", "border", "passport", "immigrant"],
            "International Law": ["treaty", "international", "foreign", "diplomatic", "global", "un", "war crimes", "jurisdiction", "cross-border", "nation", "alliance"],
            "Intellectual Property Law": ["patent", "copyright", "trademark", "intellectual property", "infringement", "royalties", "innovation", "brand", "design", "licensing"],
            "Corporate Law": ["corporate", "business", "merger", "acquisition", "shareholder", "company", "incorporation", "governance", "venture", "startup", "board", "director"],
            "Employment Law": ["job", "work", "employer", "employee", "termination", "discrimination", "harassment", "wage", "salary", "union", "contract", "wrongful dismissal"],
            "Healthcare Law": ["medical", "health", "hospital", "patient", "malpractice", "insurance", "pharmaceutical", "clinic", "doctor", "nursing home"],
            "Education Law": ["school", "student", "university", "college", "teacher", "education", "discipline", "enrollment", "tuition", "syllabus"],
            "Sports Law": ["sport", "athlete", "team", "contract", "doping", "federation", "agent", "sponsor"],
            "Consumer Law": ["consumer", "product", "warranty", "defect", "refund", "purchase", "sale", "goods", "service"],
            "General Legal Inquiry": ["legal", "lawyer", "attorney", "question", "advice", "help", "consultation", "case", "problem", "issue"]
        }

    def predict(self, description: str) -> list[str]:
        """
        Suggests relevant legal case types based on keywords in the description.

        Args:
            description (str): The user's textual description of their legal issue.

        Returns:
            list[str]: A list of suggested legal case types, sorted by relevance (highest score first).
                       Returns ["General Legal Inquiry"] if no specific keywords match,
                       or an empty list if the description is empty.
        """
        if not description:
            return []

        lower_description = description.lower()
        case_scores = collections.defaultdict(int) 

        for case_type, words in self.keywords.items():
            for word in words:
                if word in lower_description:
                    case_scores[case_type] += 1
        specific_suggestions_with_scores = [
            (c_type, score) for c_type, score in case_scores.items()
            if score > 0 and c_type != "General Legal Inquiry"
        ]

        specific_suggestions_with_scores.sort(key=lambda item: item[1], reverse=True)

        final_suggestions = [item[0] for item in specific_suggestions_with_scores]

        if not final_suggestions and lower_description.strip(): 
            final_suggestions.append("General Legal Inquiry")

        return final_suggestions

if __name__ == "__main__":
    predictor = CaseTypePredictor()

    print("--- Case Type Suggester (ML) ---")

    test_descriptions = [
        "I was arrested for theft and need a criminal lawyer.",
        "My landlord is trying to evict me from my apartment.",
        "I need to know about income tax deductions.",
        "My company is planning a merger and acquisition.",
        "I have a general legal question about my rights, what are my legal options?",
        "There's a lot of pollution in the local river and concerns about environmental impact.",
        "Just a random sentence with no specific keywords that might need legal advice.",
        "I need help with my divorce and child custody.",
        "I am an immigrant seeking asylum and need a visa.",
        "My employer is discriminating against me at work.",
        "", 
        "   " 
    ]

    for i, desc in enumerate(test_descriptions):
        print(f"\n--- Test Case {i+1} ---")
        print(f"Description: \"{desc}\"")
        suggestions = predictor.predict(desc)
        print(f"Suggested Case Types: {suggestions}")