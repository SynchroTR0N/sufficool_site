#!/usr/bin/env node

/**
 * AI-Assisted Content Creation Helper
 * Generates MDX pages for medical content using templates and AI prompts
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class ContentGenerator {
  constructor() {
    this.scriptsPath = __dirname;
    this.templatesPath = path.join(this.scriptsPath, 'templates');
    this.contentPath = path.join(this.scriptsPath, '..', 'src', 'content');
    this.promptsPath = path.join(this.scriptsPath, 'ai-prompts');
  }

  /**
   * Create a new treatment page
   */
  async createTreatmentPage(cancerType, treatmentName, options = {}) {
    const template = this.loadTemplate('treatment');
    const slug = this.generateSlug(treatmentName);
    
    const templateData = {
      treatmentName,
      cancerType,
      slug,
      treatmentType: options.treatmentType || 'therapy',
      date: new Date().toISOString().split('T')[0],
      ...options
    };

    const content = this.populateTemplate(template, templateData);
    
    const filePath = path.join(
      this.contentPath,
      'cancer-types',
      cancerType,
      'treatments',
      `${slug}.mdx`
    );
    
    this.ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Created treatment page: ${filePath}`);
    this.showAIPrompt('treatment', templateData);
    
    return filePath;
  }

  /**
   * Create a new patient journey phase page
   */
  async createJourneyPhase(cancerType, phaseName, order, options = {}) {
    const template = this.loadTemplate('journey-phase');
    const slug = this.generateSlug(phaseName);
    
    const templateData = {
      phaseName,
      cancerType,
      slug,
      order: order || 1,
      duration: options.duration || '1-2 weeks',
      date: new Date().toISOString().split('T')[0],
      ...options
    };

    const content = this.populateTemplate(template, templateData);
    
    const filePath = path.join(
      this.contentPath,
      'cancer-types',
      cancerType,
      'journey',
      `${slug}.mdx`
    );
    
    this.ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Created journey phase: ${filePath}`);
    this.showAIPrompt('journey', templateData);
    
    return filePath;
  }

  /**
   * Create a cancer type hub page
   */
  async createHubPage(cancerType, options = {}) {
    const template = this.loadTemplate('hub');
    
    const templateData = {
      cancerType,
      slug: cancerType,
      date: new Date().toISOString().split('T')[0],
      ...options
    };

    const content = this.populateTemplate(template, templateData);
    
    const filePath = path.join(
      this.contentPath,
      'cancer-types',
      cancerType,
      'index.mdx'
    );
    
    this.ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Created hub page: ${filePath}`);
    this.showAIPrompt('hub', templateData);
    
    return filePath;
  }

  /**
   * Create a calculator page
   */
  async createCalculatorPage(cancerType, calculatorName, options = {}) {
    const template = this.loadTemplate('calculator');
    const slug = this.generateSlug(calculatorName);
    
    const templateData = {
      calculatorName,
      cancerType,
      slug,
      calculatorType: options.calculatorType || 'risk-assessment',
      date: new Date().toISOString().split('T')[0],
      ...options
    };

    const content = this.populateTemplate(template, templateData);
    
    const filePath = path.join(
      this.contentPath,
      'cancer-types',
      cancerType,
      `${slug}.mdx`
    );
    
    this.ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Created calculator page: ${filePath}`);
    this.showAIPrompt('calculator', templateData);
    
    return filePath;
  }

  /**
   * Create shared medical content
   */
  async createSharedContent(contentType, topicName, options = {}) {
    const template = this.loadTemplate('shared-content');
    const slug = this.generateSlug(topicName);
    
    const templateData = {
      topicName,
      contentType,
      slug,
      date: new Date().toISOString().split('T')[0],
      ...options
    };

    const content = this.populateTemplate(template, templateData);
    
    const basePath = contentType === 'medical-concept' ? 'medical-concepts' : 'universal-concerns';
    const filePath = path.join(
      this.contentPath,
      'shared',
      basePath,
      `${slug}.mdx`
    );
    
    this.ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Created shared content: ${filePath}`);
    this.showAIPrompt('shared', templateData);
    
    return filePath;
  }

  /**
   * Interactive content creation wizard
   */
  async runWizard() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

    console.log('\n🧙‍♂️ AI-Assisted Content Creation Wizard\n');
    
    const contentType = await question('Content type (treatment/journey/hub/calculator/shared): ');
    
    switch (contentType) {
      case 'treatment':
        const cancerType = await question('Cancer type: ');
        const treatmentName = await question('Treatment name: ');
        const treatmentType = await question('Treatment type (optional): ');
        await this.createTreatmentPage(cancerType, treatmentName, { treatmentType });
        break;
        
      case 'journey':
        const jCancerType = await question('Cancer type: ');
        const phaseName = await question('Phase name: ');
        const order = await question('Phase order (1-5): ');
        const duration = await question('Estimated duration: ');
        await this.createJourneyPhase(jCancerType, phaseName, parseInt(order), { duration });
        break;
        
      case 'hub':
        const hCancerType = await question('Cancer type: ');
        await this.createHubPage(hCancerType);
        break;
        
      case 'calculator':
        const cCancerType = await question('Cancer type: ');
        const calculatorName = await question('Calculator name: ');
        const calculatorType = await question('Calculator type: ');
        await this.createCalculatorPage(cCancerType, calculatorName, { calculatorType });
        break;
        
      case 'shared':
        const sContentType = await question('Shared content type (medical-concept/universal-concern): ');
        const topicName = await question('Topic name: ');
        await this.createSharedContent(sContentType, topicName);
        break;
        
      default:
        console.log('❌ Invalid content type');
    }
    
    rl.close();
  }

  /**
   * Utility methods
   */
  ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  }

  loadTemplate(templateName) {
    const templatePath = path.join(this.templatesPath, `${templateName}.mdx`);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    return fs.readFileSync(templatePath, 'utf-8');
  }

  populateTemplate(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  }

  generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  showAIPrompt(promptType, data) {
    console.log('\n🤖 AI Prompt Generated:');
    console.log('━'.repeat(50));
    
    try {
      const prompts = require(path.join(this.promptsPath, 'treatment-page-prompt.js'));
      const sharedPrompts = require(path.join(this.promptsPath, 'shared-content-prompt.js'));
      
      let prompt = '';
      switch (promptType) {
        case 'treatment':
          prompt = prompts.TREATMENT_PAGE_PROMPT;
          break;
        case 'journey':
          prompt = prompts.JOURNEY_PHASE_PROMPT;
          break;
        case 'hub':
          prompt = prompts.HUB_PAGE_PROMPT;
          break;
        case 'calculator':
          prompt = prompts.CALCULATOR_PAGE_PROMPT;
          break;
        case 'shared':
          prompt = sharedPrompts.MEDICAL_CONCEPT_PROMPT;
          break;
      }
      
      // Replace template variables in prompt
      const populatedPrompt = this.populateTemplate(prompt, data);
      console.log(populatedPrompt);
      
    } catch (error) {
      console.log('Prompt template not found or error loading prompts');
    }
    
    console.log('━'.repeat(50));
    console.log('💡 Copy this prompt to your AI assistant to generate content for the created template file.\n');
  }

  /**
   * List available templates and their purposes
   */
  listTemplates() {
    console.log('\n📋 Available Content Templates:\n');
    
    const templates = [
      { name: 'treatment', desc: 'Treatment option pages with medical components' },
      { name: 'journey-phase', desc: 'Patient journey phase pages with checklists' },
      { name: 'hub', desc: 'Cancer type overview and navigation pages' },
      { name: 'calculator', desc: 'Interactive risk assessment and prediction tools' },
      { name: 'shared-content', desc: 'Universal medical concepts and patient concerns' }
    ];
    
    templates.forEach(template => {
      const exists = fs.existsSync(path.join(this.templatesPath, `${template.name}.mdx`));
      const status = exists ? '✅' : '❌';
      console.log(`${status} ${template.name.padEnd(15)} - ${template.desc}`);
    });
    
    console.log('\n💡 Use "pnpm run create-content wizard" for interactive content creation');
    console.log('💡 Use "pnpm run create-content [type] [args]" for direct creation\n');
  }
}

// CLI Interface
if (require.main === module) {
  const generator = new ContentGenerator();
  const command = process.argv[2];
  const args = process.argv.slice(3);

  switch (command) {
    case 'treatment':
      if (args.length < 2) {
        console.log('Usage: create-content treatment <cancer-type> <treatment-name> [treatment-type]');
        process.exit(1);
      }
      generator.createTreatmentPage(args[0], args[1], { treatmentType: args[2] });
      break;

    case 'journey':
      if (args.length < 3) {
        console.log('Usage: create-content journey <cancer-type> <phase-name> <order> [duration]');
        process.exit(1);
      }
      generator.createJourneyPhase(args[0], args[1], parseInt(args[2]), { duration: args[3] });
      break;

    case 'hub':
      if (args.length < 1) {
        console.log('Usage: create-content hub <cancer-type>');
        process.exit(1);
      }
      generator.createHubPage(args[0]);
      break;

    case 'calculator':
      if (args.length < 2) {
        console.log('Usage: create-content calculator <cancer-type> <calculator-name> [calculator-type]');
        process.exit(1);
      }
      generator.createCalculatorPage(args[0], args[1], { calculatorType: args[2] });
      break;

    case 'shared':
      if (args.length < 2) {
        console.log('Usage: create-content shared <content-type> <topic-name>');
        process.exit(1);
      }
      generator.createSharedContent(args[0], args[1]);
      break;

    case 'wizard':
      generator.runWizard();
      break;

    case 'list':
      generator.listTemplates();
      break;

    default:
      console.log('\n🚀 AI-Assisted Content Creation Tool\n');
      console.log('Available commands:');
      console.log('  treatment <cancer-type> <treatment-name> [treatment-type]');
      console.log('  journey <cancer-type> <phase-name> <order> [duration]');
      console.log('  hub <cancer-type>');
      console.log('  calculator <cancer-type> <calculator-name> [calculator-type]');
      console.log('  shared <content-type> <topic-name>');
      console.log('  wizard                    - Interactive content creation');
      console.log('  list                      - Show available templates');
      console.log('\nExamples:');
      console.log('  pnpm run create-content treatment prostate "SBRT" radiation');
      console.log('  pnpm run create-content journey prostate diagnosis 1 "1-2 weeks"');
      console.log('  pnpm run create-content wizard');
  }
}

module.exports = ContentGenerator;