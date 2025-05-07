use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey::Pubkey;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod zeropilot {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.owner = ctx.accounts.owner.key();
        wallet.nonce = 0;
        Ok(())
    }

    pub fn trigger_cross_chain_action(
        ctx: Context<TriggerCrossChainAction>,
        destination_chain_id: u16,
        action_payload: Vec<u8>,
    ) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        
        // Verify owner
        require!(
            wallet.owner == ctx.accounts.owner.key(),
            ZeroPilotError::Unauthorized
        );

        // Increment nonce
        wallet.nonce = wallet.nonce.checked_add(1).unwrap();

        // Emit cross-chain action event
        emit!(CrossChainActionEvent {
            wallet: wallet.key(),
            owner: wallet.owner,
            destination_chain_id,
            action_payload,
            nonce: wallet.nonce,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + Wallet::LEN,
        seeds = [b"wallet", owner.key().as_ref()],
        bump
    )]
    pub wallet: Account<'info, Wallet>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TriggerCrossChainAction<'info> {
    #[account(
        mut,
        seeds = [b"wallet", owner.key().as_ref()],
        bump
    )]
    pub wallet: Account<'info, Wallet>,
    pub owner: Signer<'info>,
}

#[account]
pub struct Wallet {
    pub owner: Pubkey,
    pub nonce: u64,
}

impl Wallet {
    pub const LEN: usize = 32 + 8; // owner (Pubkey) + nonce (u64)
}

#[event]
pub struct CrossChainActionEvent {
    pub wallet: Pubkey,
    pub owner: Pubkey,
    pub destination_chain_id: u16,
    pub action_payload: Vec<u8>,
    pub nonce: u64,
}

#[error_code]
pub enum ZeroPilotError {
    #[msg("Unauthorized")]
    Unauthorized,
}
